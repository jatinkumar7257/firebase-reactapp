import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const Logout = () => {
  return (
    <Container
      component="div"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Card
        sx={{
          width: "95%",
          boxShadow: "none",
          border: "1px solid #dbdbdb",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              sx={{ width: 56, height: 56, mb: 2 }}
            />
            <Typography component="p" variant="h5" sx={{ textAlign: "center" }}>
              You are Logged Out
            </Typography>
            <Typography component="p" variant="p" sx={{ textAlign: "center" }}>
              Thank you for using tryApp
            </Typography>
            <NavLink
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                marginTop: 10,
                padding: 4,
                textTransform: "capitalize",
                width: "100%",
                backgroundColor: "rgba(254,139,58,255)",
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Log In
            </NavLink>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Logout;
