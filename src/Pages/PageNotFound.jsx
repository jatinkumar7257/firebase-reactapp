import React from "react";

// Import Components
import { Box, Button, Container, Typography } from "@mui/material";

// Import navigate
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {

  // React Navigate hook
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Box>
          <Typography variant="h1">404</Typography>
          <Typography variant="h6">
            The page you’re looking for doesn’t exist.
          </Typography>
          <Button
            variant="contained"
            sx={{ color: "#ffff" }}
            onClick={() => navigate('/')}
          >
            Back Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PageNotFound;
