import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import CircularSize from "../../component/common/loading/Loading";
import { useCartStore } from "../cart/useCart";
import { getProductById } from "../products/api/productService";
import toast from "react-hot-toast";

const INK = "#3C4242";
const MUTED = "#807D7E";
const ACCENT = "#111880";
const BORDER = "#EFEFF1";
const GOLD = "#F2C43D";

const SIZES = ["Small", "Medium", "Large", "Extra large"];

export default function ActionAreaCard() {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Medium");
  const [wished, setWished] = useState(false);

  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(data, quantity);
    toast.success("The product added to cart successfully");
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <CircularSize />;

  if (isError || !data) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          py: 10,
          fontFamily: "causten",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 44, color: "#D71F1F" }} />
        <Typography
          sx={{
            fontFamily: "sansc",
            fontWeight: 700,
            fontSize: 18,
            color: INK,
          }}
        >
          This product could not be loaded
        </Typography>
        <Typography sx={{ fontSize: 13, color: MUTED }}>
          {error?.message}
        </Typography>
        <Button
          component={Link}
          to="/products"
          sx={{
            mt: 1,
            px: 3,
            py: 1,
            borderRadius: "999px",
            textTransform: "none",
            fontFamily: "causten",
            fontWeight: 600,
            color: "#fff",
            backgroundColor: INK,
            "&:hover": { backgroundColor: ACCENT },
          }}
        >
          Back to products
        </Button>
      </Box>
    );
  }

  const total = (data.price * quantity).toFixed(2);

  const details = [
    { label: "Category", value: data.category },
    { label: "Reviews", value: data.rating?.count },
    { label: "SKU", value: `#${String(data.id).padStart(4, "0")}` },
  ];

  return (
    <Box
      sx={{
        maxWidth: "1280px",
        mx: "auto",
        px: { xs: "16px", sm: "24px", md: "40px" },
        py: { xs: 3, md: 5 },
        fontFamily: "causten",
      }}
    >
      {/* ---------- breadcrumb ---------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
          mb: { xs: 2, md: 3 },
          fontSize: "12px",
          color: MUTED,
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            color: MUTED,
            textDecoration: "none",
            "&:hover": { color: ACCENT },
          }}
        >
          Home
        </Box>
        <ChevronRightIcon sx={{ fontSize: 15, color: "#C9C9C9" }} />
        <Box
          component={Link}
          to="/products"
          sx={{
            color: MUTED,
            textDecoration: "none",
            "&:hover": { color: ACCENT },
          }}
        >
          Products
        </Box>
        <ChevronRightIcon sx={{ fontSize: 15, color: "#C9C9C9" }} />
        <Box
          component="span"
          sx={{
            maxWidth: "38ch",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: INK,
            fontWeight: 600,
          }}
        >
          {data.title}
        </Box>
      </Box>

      {/* ---------- main card ---------- */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) minmax(0, 1fr)",
          },
          gap: { xs: 3, md: 5 },
          p: { xs: "14px", sm: "20px", md: "28px" },
          backgroundColor: "#fff",
          border: `1px solid ${BORDER}`,
          borderRadius: { xs: "20px", md: "26px" },
          boxShadow: "0 30px 70px -50px rgba(17,24,128,.55)",
        }}
      >
        {/* ---------- gallery ---------- */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, md: 3 },
            borderRadius: "18px",
            overflow: "hidden",
            backgroundColor: "#F8F8FA",
          }}
        >
          <Box
            className="gallery-img"
            component="img"
            src={data.image}
            alt={data.title}
            sx={{
              display: "block",
              width: "100%",
              aspectRatio: "1/1",
              objectFit: "contain",
              transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
            }}
          />

          {data.category && (
            <Box
              sx={{
                position: "absolute",
                top: 14,
                left: 14,
                px: "10px",
                py: "5px",
                borderRadius: "999px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "#fff",
                backgroundColor: "rgba(38,42,44,.62)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {data.category}
            </Box>
          )}

          <Box
            role="button"
            aria-label="add to wishlist"
            aria-pressed={wished}
            onClick={() => setWished((value) => !value)}
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "grid",
              placeItems: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              cursor: "pointer",
              color: "#fff",
              backgroundColor: "rgba(38,42,44,.62)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition: "transform .25s, background-color .25s, color .25s",
              "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: "#fff",
                color: "#E23D5B",
              },
            }}
          >
            {wished ? (
              <FavoriteIcon sx={{ fontSize: 19, color: "#E23D5B" }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 19 }} />
            )}
          </Box>
        </Box>

        {/* ---------- details ---------- */}
        <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: "sansc",
              fontWeight: 700,
              fontSize: { xs: "20px", md: "26px" },
              lineHeight: 1.35,
              color: INK,
            }}
          >
            {data.title}
          </Typography>

          {/* rating */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
              mt: "12px",
            }}
          >
            <Rating
              readOnly
              precision={0.1}
              value={data.rating?.rate ?? 0}
              sx={{ fontSize: "18px", color: GOLD }}
            />
            <Typography sx={{ fontSize: "12.5px", color: MUTED }}>
              <Box
                component="span"
                sx={{ fontWeight: 700, color: INK, mr: "4px" }}
              >
                {data.rating?.rate}
              </Box>
              ({data.rating?.count} reviews)
            </Typography>
          </Box>

          {/* price */}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: "5px",
              mt: "18px",
            }}
          >
            <Typography
              component="span"
              sx={{ fontSize: "16px", fontWeight: 600, color: MUTED }}
            >
              $
            </Typography>
            <Typography
              component="span"
              sx={{
                fontSize: { xs: "28px", md: "32px" },
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-.02em",
                color: ACCENT,
              }}
            >
              {data.price}
            </Typography>
          </Box>

          {/* real facts sourced from the product record */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "10px",
              mt: "20px",
              p: "12px",
              borderRadius: "14px",
              backgroundColor: "#F8F8FA",
            }}
          >
            {details.map(({ label, value }) => (
              <Box key={label} sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: "9.5px",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: MUTED,
                    mb: "3px",
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: INK,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {value ?? "—"}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: "20px" }} />

          {/* description */}
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: MUTED,
              mb: "8px",
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              lineHeight: 1.9,
              color: MUTED,
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {data.description}
          </Typography>

          <Divider sx={{ my: "20px" }} />

          {/* size */}
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: MUTED,
              mb: "10px",
            }}
          >
            Choose a size
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={size}
            onChange={(event, next) => {
              if (next !== null) setSize(next);
            }}
            aria-label="choose a size"
            sx={{
              flexWrap: "wrap",
              gap: "8px",
              "& .MuiToggleButtonGroup-grouped": {
                m: "0 !important",
                px: "16px",
                py: "7px",
                borderRadius: "999px !important",
                border: `1px solid ${BORDER} !important`,
                fontSize: "12.5px",
                fontWeight: 600,
                color: INK,
                textTransform: "none",
                backgroundColor: "#fff",
                transition: "all .25s",
                "&:hover": {
                  borderColor: `${ACCENT} !important`,
                  color: ACCENT,
                  backgroundColor: "#F4F5FF",
                },
                "&.Mui-selected": {
                  borderColor: `${ACCENT} !important`,
                  backgroundColor: ACCENT,
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0C1268" },
                },
              },
            }}
          >
            {SIZES.map((option) => (
              <ToggleButton key={option} value={option}>
                {option}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Divider sx={{ my: "20px" }} />

          {/* quantity + add to cart */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                p: "4px",
                borderRadius: "999px",
                backgroundColor: "#F1F2F5",
              }}
            >
              <IconButton
                size="small"
                aria-label="decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                sx={{
                  width: 32,
                  height: 32,
                  color: INK,
                  "&:hover": { backgroundColor: "#fff" },
                }}
              >
                <RemoveIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <Typography
                sx={{
                  minWidth: 28,
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: INK,
                }}
              >
                {quantity}
              </Typography>
              <IconButton
                size="small"
                aria-label="increase quantity"
                onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                sx={{
                  width: 32,
                  height: 32,
                  color: INK,
                  "&:hover": { backgroundColor: "#fff" },
                }}
              >
                <AddIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>

            <Button
              disableElevation
              onClick={handleAddToCart}
              startIcon={<ShoppingCartIcon sx={{ fontSize: 18 }} />}
              sx={{
                flex: "1 1 200px",
                justifyContent: "space-between",
                px: "18px",
                py: "12px",
                borderRadius: "999px",
                textTransform: "none",
                fontFamily: "causten",
                fontSize: "13.5px",
                fontWeight: 600,
                color: "#fff",
                background: `linear-gradient(135deg, ${INK} 0%, #2B3030 100%)`,
                transition: "background .3s, box-shadow .3s, transform .2s",
                "& .MuiButton-startIcon": { mr: "8px" },
                "&:hover": {
                  background: `linear-gradient(135deg, ${ACCENT} 0%, #2A2FA8 100%)`,
                  boxShadow: "0 14px 30px -14px rgba(17,24,128,.9)",
                },
                "&:active": { transform: "scale(.985)" },
              }}
            >
              Add to cart
              <Box
                component="span"
                sx={{
                  pl: "10px",
                  ml: "6px",
                  fontWeight: 700,
                  borderLeft: "1px solid rgba(255,255,255,.28)",
                }}
              >
                ${total}
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
