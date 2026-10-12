import CircularSize from "../../component/common/loading/Loading";
import BasicCard from "./BasicCard";
import Grid from "@mui/material/Grid";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "@mui/material/Button";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";

import { getProducts } from "./api/productService";
import { useSearchParams } from "react-router-dom";

export default function Cards() {
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get("search");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", searchParam],
    queryFn: ({ queryKey }) => getProducts(queryKey[1]), //input=>searchparam
  });

  if (isLoading) return <CircularSize />;
  if (isError || !data || !Array.isArray(data))
    return (
      <div
        className="error-display"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img style={{ width: "180px" }} src="error3.png" alt="error Icon" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ErrorOutlineIcon
            sx={{
              color: "rgb(215, 31, 31)",
              height: "30px",
              width: "40px",
            }}
          />
          <h1>Something went wrong...</h1>
        </div>
        <h3 style={{ color: "rgba(187, 34, 34, 1)" }}>{error?.message}</h3>
      </div>
    );

  return (
    <Grid
      maxWidth={"1280px"}
      container
      justifyContent="center"
      alignItems="center"
      marginBottom={5}
      spacing={2}
      sx={{
        marginX: "auto",
        padding: { xs: "10px 32px", sm: "20px 95px", md: "20px 70px" },
        justifyContent: { sm: "start", md: "center" },
      }}
    >
      {data.map(
        ({ id, title, description, image, price, rating, category }) => (
          <Grid
            key={id}
            style={{
              marginBottom: "15px",
            }}
            size={{ xs: 6, sm: 4, md: 3 }}
          >
            <BasicCard
              id={id}
              title={title}
              description={description}
              image={image}
              price={price}
              rating={rating}
              category={category}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
}
