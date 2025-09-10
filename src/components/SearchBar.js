import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Search widgets"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        borderRadius: "25px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        "& .MuiOutlinedInput-root": {
          borderRadius: "25px",
          backgroundColor: "#ffffff",
          "& fieldset": {
            borderColor: "#e0e0e0",
          },
          "&:hover fieldset": {
            borderColor: "#bdbdbd",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
            borderWidth: "2px",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#757575",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#9e9e9e",
          opacity: 1,
        },
        mb: 2,
      }}
    />
  );
}

export default SearchBar;
