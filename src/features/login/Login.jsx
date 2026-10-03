import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowBack,
  Checkroom,
  ErrorOutlineOutlined,
  LocalShippingOutlined,
  LockOutlined,
  LoginRounded,
  PersonOutline,
  Visibility,
  VisibilityOff,
  WorkspacePremiumOutlined,
} from "@mui/icons-material";

const FONT = "causten";
const INK = "#3C4242";
const INK_DARK = "#2B3030";
const MUTED = "#807D7E";
const BORDER = "#E4E4E4";

// Demo credentials. Replace with a real API call when the backend is ready.
const DEMO_USER = { username: "negar", password: "7777" };

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters"),
});

// Fake request delay so the loading state stays visible.
const REQUEST_DELAY = 900;

const highlights = [
  {
    icon: <Checkroom sx={{ fontSize: 18 }} />,
    text: "Curated vintage & modern pieces",
  },
  {
    icon: <LocalShippingOutlined sx={{ fontSize: 18 }} />,
    text: "Fast, tracked delivery",
  },
  {
    icon: <WorkspacePremiumOutlined sx={{ fontSize: 18 }} />,
    text: "Quality checked before every shipment",
  },
];

// Shared styling for both inputs.
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "#fff",
    "& fieldset": { borderColor: BORDER },
    "&:hover fieldset": { borderColor: "#C9C9C9" },
    "&.Mui-focused fieldset": { borderColor: INK, borderWidth: "1.5px" },
  },
  "& .MuiInputBase-input": {
    fontFamily: FONT,
    fontSize: 15,
    py: 1.5,
  },
  "& .MuiFormHelperText-root": {
    fontFamily: FONT,
    fontSize: 12,
    marginLeft: 0,
  },
};

const labelSx = {
  display: "block",
  mb: 0.75,
  fontFamily: FONT,
  fontSize: 13,
  fontWeight: 600,
  color: INK,
};

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const passwordInputRef = useRef(null);

  const onSubmit = async ({ username, password }) => {
    setErrorMsg("");
    await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY));

    const isValid =
      username === DEMO_USER.username && password === DEMO_USER.password;

    if (!isValid) {
      setErrorMsg("Invalid username or password. Please try again.");
      resetField("password");
      const passwordInput = passwordInputRef.current;
      if (passwordInput) {
        passwordInput.value = "";
        passwordInput.focus();
      }
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    navigate("/admin", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: FONT,
        bgcolor: "#F6F6F6",
      }}
    >
      {/* Brand panel */}
      <Box
        sx={{
          position: "relative",
          flex: 1.1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          // p: 6,
          color: "#fff",
          backgroundImage:
            "linear-gradient(160deg, rgba(24,28,28,0.94) 0%, rgba(43,48,48,0.80) 50%, rgba(60,66,66,0.62) 100%), url(/store.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: FONT,
              fontSize: 100,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            Euforia
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
          © {new Date().getFullYear()} Euforia. All rights reserved.
        </Typography>
      </Box>

      {/* Form part */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 6 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: FONT,
              fontSize: 30,
              fontWeight: "bold",
              color: INK,
            }}
          >
            Welcome back
          </Typography>
          <Typography sx={{ mt: 1, mb: 3.5, fontSize: 14, color: MUTED }}>
            Enter your credentials to access your account.
          </Typography>

          <Collapse in={Boolean(errorMsg)} unmountOnExit>
            <Alert
              severity="error"
              icon={<ErrorOutlineOutlined fontSize="inherit" />}
              sx={{
                mb: 3,
                borderRadius: 2,
                fontFamily: FONT,
                fontSize: 13,
                alignItems: "center",
              }}
            >
              {errorMsg}
            </Alert>
          </Collapse>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <Box>
              <Typography component="label" htmlFor="username" sx={labelSx}>
                Username
              </Typography>
              <TextField
                {...register("username")}
                id="username"
                fullWidth
                autoFocus
                autoComplete="username"
                placeholder="Enter your username"
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
                sx={fieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline sx={{ fontSize: 19, color: MUTED }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box>
              <Typography component="label" htmlFor="password" sx={labelSx}>
                Password
              </Typography>
              <TextField
                {...register("password")}
                inputRef={passwordInputRef}
                id="password"
                fullWidth
                autoComplete="current-password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                sx={fieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ fontSize: 19, color: MUTED }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          sx={{ color: MUTED }}
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ fontSize: 20 }} />
                          ) : (
                            <Visibility sx={{ fontSize: 20 }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              disabled={isSubmitting}
              startIcon={isSubmitting ? null : <LoginRounded />}
              sx={{
                mt: 1,
                py: 1.4,
                borderRadius: 2,
                fontFamily: FONT,
                fontSize: 15,
                fontWeight: "bold",
                textTransform: "none",
                bgcolor: INK,
                boxShadow: "0 8px 20px rgba(60,66,66,0.22)",
                transition: "all 0.25s ease",
                "&:hover": {
                  bgcolor: INK_DARK,
                  boxShadow: "0 10px 26px rgba(60,66,66,0.3)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-disabled": { bgcolor: "#B9BCBC", color: "#fff" },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                "Sign in"
              )}
            </Button>
          </Box>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: `1px solid ${BORDER}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontFamily: FONT,
                fontSize: 13,
                color: MUTED,
                "&:hover": { color: INK },
              }}
            >
              <ArrowBack sx={{ fontSize: 16 }} />
              Back to store
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
