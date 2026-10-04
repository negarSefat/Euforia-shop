import "@fontsource/poppins";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../cart/useCart";
import { toast } from "react-hot-toast";

const INK = "#3C4242";
const MUTED = "#807D7E";
const ACCENT = "#111880";

export default function ImgMediaCard({
  id,
  title,
  image,
  rating,
  price,
  category,
}) {
  const navigate = useNavigate();
  const [wished, setWished] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ id, title, image, price });
    toast.success(`The product added to cart successfully!`);
  };

  return (
    <Card
      elevation={0}
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "18px",
        border: "1px solid #EFEFF1",
        backgroundColor: "#fff",
        fontFamily: "causten",
        transition:
          "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s, border-color .35s",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "transparent",
          boxShadow: "0 18px 40px -18px rgba(17,24,128,.35)",
        },
      }}
    >
      <Box
        onClick={() => navigate(`/products/${id}`)}
        sx={{
          position: "relative",
          m: "8px",
          borderRadius: "14px",
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor: "#F2F3F5",
          "&:hover .media-img": { transform: "scale(1.06)" },
          "&:hover .media-veil": { opacity: 1 },
          "&:hover .media-cta": { opacity: 1, transform: "translateY(0)" },
        }}
      >
        <Box
          className="media-img"
          component="img"
          src={image}
          alt={title}
          loading="lazy"
          sx={{
            display: "block",
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            transition: "transform .55s cubic-bezier(.2,.8,.2,1)",
          }}
        />

        <Box
          className="media-veil"
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity .35s",
            background:
              "linear-gradient(to top, rgba(18,20,24,.42) 0%, rgba(18,20,24,0) 52%)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            display: "flex",
            alignItems: "center",
            gap: "3px",
            padding: "4px 9px",
            borderRadius: "999px",
            fontSize: "11px",
            color: "#fff",
            backgroundColor: "rgba(38,42,44,.62)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <StarIcon sx={{ fontSize: 14, color: "#F2C43D" }} />
          <Box component="span" sx={{ fontWeight: 700 }}>
            {rating?.rate ?? "—"}
          </Box>
          <Box component="span" sx={{ color: "rgba(255,255,255,.72)" }}>
            ({rating?.count ?? 0})
          </Box>
        </Box>

        {/* wishlist */}
        <Box
          role="button"
          aria-label="add to wishlist"
          aria-pressed={wished}
          onClick={(event) => {
            event.stopPropagation();
            setWished((value) => !value);
          }}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 32,
            height: 32,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            cursor: "pointer",
            color: "#fff",
            backgroundColor: "rgba(38,42,44,.62)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "transform .25s, background-color .25s, color .25s",
            "&:hover": {
              transform: "scale(1.12)",
              backgroundColor: "#fff",
              color: "#E23D5B",
            },
          }}
        >
          {wished ? (
            <FavoriteIcon sx={{ fontSize: 17, color: "#E23D5B" }} />
          ) : (
            <FavoriteBorderIcon sx={{ fontSize: 17 }} />
          )}
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, px: "14px", pt: "2px", pb: "8px" }}>
        {category && (
          <Typography
            sx={{
              mb: "6px",
              fontSize: 9,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            {category}
          </Typography>
        )}

        <Typography
          onClick={() => navigate(`/products/${id}`)}
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            minHeight: 40,
            fontFamily: "causten",
            fontSize: "13px",
            fontWeight: 600,
            lineHeight: 1.55,
            color: INK,
            cursor: "pointer",
            transition: "color .25s",
            "&:hover": { color: ACCENT },
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            mt: "10px",
            display: "flex",
            alignItems: "baseline",
            gap: "4px",
          }}
        >
          <Typography
            component="span"
            sx={{ fontSize: "12px", fontWeight: 600, color: MUTED }}
          >
            $
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "-.02em",
              color: INK,
            }}
          >
            {price}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ p: "0 14px 14px" }}>
        <Button
          fullWidth
          disableElevation
          onClick={handleAddToCart}
          startIcon={<ShoppingCartIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
          sx={{
            py: "9px",
            borderRadius: "999px",
            textTransform: "none",
            fontFamily: "causten",
            fontSize: { xs: "11px", sm: "12.5px" },
            fontWeight: 600,
            color: "#fff",
            background: `linear-gradient(135deg, ${INK} 0%, #2B3030 100%)`,
            transition: "background .3s, box-shadow .3s, transform .2s",
            "& .MuiButton-startIcon": { mr: { xs: "3px", sm: "6px" } },
            "&:hover": {
              background: `linear-gradient(135deg, ${ACCENT} 0%, #2A2FA8 100%)`,
              boxShadow: "0 10px 22px -10px rgba(17,24,128,.85)",
            },
            "&:active": { transform: "scale(.97)" },
          }}
        >
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Add to cart
          </Box>
          <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
            Add
          </Box>
        </Button>
      </CardActions>
    </Card>
  );
}
