// App.js
import React from "react";
import Dashboard from "./components/Dashboard";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="xl" sx={{ padding: 3 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        fontWeight="bold"
        sx={{
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        CNAPP Dashboard
      </Typography>
      <Dashboard />
    </Container>
  );
}

export default App;