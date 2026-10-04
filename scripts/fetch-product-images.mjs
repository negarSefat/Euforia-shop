#!/usr/bin/env node
/**
 * Fetches real product photos and saves them into public/products/.
 *
 * Source: the Digikala search API, which returns studio-style product shots on
 * a white background — a much better fit for a storefront than the amateur
 * listing photos a price-comparison site returns. Both Digikala's API and its
 * image CDN are reachable from Iran, and the download runs on your machine, so
 * after this has run once the app has no external dependency at all.
 *
 *   npm run images:fetch              # skip products that already have a photo
 *   npm run images:fetch -- --force   # re-download everything
 *   npm run images:fetch -- --only 5,7,9
 *
 * A product whose download fails keeps its existing image, so the storefront
 * never shows a broken image.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SEARCH_ENDPOINT = "https://api.digikala.com/v1/search/";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "application/json",
  "Accept-Language": "fa-IR,fa;q=0.9,en;q=0.8",
};

/** How many search hits to consider before giving up on a product. */
const CANDIDATES_PER_PRODUCT = 8;

/** Side length requested from Digikala's image resizer, in pixels. */
const IMAGE_SIZE = 800;

/**
 * Search terms per product id.
 */
const QUERIES = {
  1: "کوله پشتی لپ تاپ",
  2: "تی شرت مردانه یقه گرد",
  3: "کاپشن مردانه زمستانی",
  4: "پیراهن مردانه آستین کوتاه",
  5: "دستبند طلا زنانه",
  6: "انگشتر طلا زنانه",
  7: "انگشتر نقره نقره",
  8: "گوشواره طلا زنانه",
  9: "هارد اکسترنال WD",
  10: "اس اس دی ساندیسک",
  11: "اس اس دی Silicon Power",
  12: "هارد اکسترنال گیمینگ",
  13: "مانیتور ایسر",
  14: "مانیتور گیمینگ سامسونگ",
  15: "کاپشن زنانه زمستانی",
  16: "کاپشن چرم زنانه",
  17: "بارانی زنانه",
  18: "تی شرت زنانه یقه قایقی",
  19: "تی شرت ورزشی زنانه",
  20: "تی شرت زنانه نخی",
};

// ---------------------------------------------------------------------------

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const dbPath = join(root, "db.json");
const outDir = join(root, "public", "products");

const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyIndex = args.findIndex((a) => a.startsWith("--only"));
const only = (() => {
  if (onlyIndex === -1) return null;
  const arg = args[onlyIndex];
  const value = arg.includes("=") ? arg.split("=")[1] : args[onlyIndex + 1];
  return new Set(
    String(value)
      .split(",")
      .map((n) => Number(n.trim())),
  );
})();

/** Digikala returns the image URL as either a string or a one-element array. */
function firstUrl(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.find((v) => typeof v === "string") ?? null;
  return null;
}

/**
 * Bumps the CDN's resize parameters up to IMAGE_SIZE.
 */
function upscale(url) {
  return url.replace(
    /resize,m_lfit,h_\d+,w_\d+/,
    `resize,m_lfit,h_${IMAGE_SIZE},w_${IMAGE_SIZE}`,
  );
}

/**
 * Checks the file signature rather than the Content-Type header — the CDN
 * serves perfectly good JPEGs as application/octet-stream.
 */
function looksLikeImage(buffer) {
  const startsWith = (...bytes) => bytes.every((b, i) => buffer[i] === b);

  if (startsWith(0xff, 0xd8, 0xff)) return true; // JPEG
  if (startsWith(0x89, 0x50, 0x4e, 0x47)) return true; // PNG
  if (startsWith(0x47, 0x49, 0x46, 0x38)) return true; // GIF
  if (startsWith(0x52, 0x49, 0x46, 0x46)) return true; // RIFF (WebP)
  return false;
}

async function searchImages(query) {
  const url = `${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}`;
  const response = await fetch(url, { headers: HEADERS });

  if (!response.ok) throw new Error(`search returned HTTP ${response.status}`);

  const body = await response.json();
  const products = body?.data?.products;

  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("search returned no products");
  }

  return products
    .slice(0, CANDIDATES_PER_PRODUCT)
    .map((product) => ({
      imageUrl: firstUrl(product?.images?.main?.url),
      name: product?.title_fa ?? "(untitled)",
    }))
    .filter((candidate) => candidate.imageUrl)
    .map((candidate) => ({
      ...candidate,
      imageUrl: upscale(candidate.imageUrl),
    }));
}

async function download(imageUrl, destination) {
  const response = await fetch(imageUrl, { headers: HEADERS });
  if (!response.ok) throw new Error(`image returned HTTP ${response.status}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1024) {
    throw new Error(`suspiciously small file (${buffer.length} bytes)`);
  }
  if (!looksLikeImage(buffer)) {
    const contentType = response.headers.get("content-type") ?? "unknown";
    throw new Error(`not an image (content-type: ${contentType})`);
  }

  writeFileSync(destination, buffer);
  return buffer.length;
}

const db = JSON.parse(readFileSync(dbPath, "utf8"));
mkdirSync(outDir, { recursive: true });

/** Digikala product ids already used, so two products never share a photo. */
const usedSourceIds = new Set();
const succeeded = [];
const failed = [];
let dbChanged = false;

for (const product of db.products ?? []) {
  if (only && !only.has(product.id)) continue;

  const label = `#${String(product.id).padStart(2)} ${product.title.slice(0, 42)}`;
  const localPath = `products/${product.id}.jpg`;
  const destination = join(outDir, `${product.id}.jpg`);

  if (existsSync(destination) && !force) {
    console.log(`  skip   ${label}  (already downloaded)`);
    if (product.image !== localPath) {
      product.image = localPath;
      dbChanged = true;
    }
    succeeded.push(product.id);
    continue;
  }

  const query = QUERIES[product.id] ?? product.title;

  try {
    const candidates = await searchImages(query);
    let saved = null;

    for (const candidate of candidates) {
      if (usedSourceIds.has(candidate.imageUrl)) continue;
      const bytes = await download(candidate.imageUrl, destination);
      usedSourceIds.add(candidate.imageUrl);
      saved = { bytes, name: candidate.name };
      break;
    }

    if (!saved) {
      throw new Error(`all ${candidates.length} candidates were already used`);
    }

    product.image = localPath;
    dbChanged = true;
    succeeded.push(product.id);
    console.log(
      `  ok     ${label}  (${Math.round(saved.bytes / 1024)} KB)  ${saved.name.slice(0, 38)}`,
    );
  } catch (error) {
    failed.push({
      id: product.id,
      title: product.title,
      reason: error.message,
    });
    console.log(`  FAIL   ${label}  ->  ${error.message}`);
  }
}

if (dbChanged) {
  writeFileSync(dbPath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
}

// console.log(`\n✅ ${succeeded.length} image(s) ready`);
// if (failed.length > 0) {
//   console.log(
//     `⚠️  ${failed.length} failed — those products keep their old image:`,
//   );
//   for (const f of failed)
//     console.log(`     #${f.id}  ${f.title}  (${f.reason})`);
// }
