import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";

export default function ProductSearch() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    setSearchParam((params) => {
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }

      return params;
    });
  }, [debouncedSearch, setSearchParam]);

  useEffect(() => {
    const search = searchParam.get("search");
    setSearchInput(search ?? "");
  }, [searchParam]);

  return (
    <TextField
      value={searchInput}
      onChange={(e) => {
        setSearchInput(e.target.value);
      }}
      placeholder="Search products..."
      variant="outlined"
      size="small"
      sx={{ width: 300 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
