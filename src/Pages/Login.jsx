import React, { useState } from "react";

// Import Components
import {
  Container,
  Card,
  CardContent,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  CircularProgress
} from "@mui/material";

// Import Icons
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { NavLink } from "react-router-dom";

// Import Simple Snack
import SimpleSnack from "./MainPageComponents/SimpleSnack";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

  // User Credentials
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [isFetching, setIsFetching] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Snackbar Handle
  const [SimpleSnacking, setSimpleSnacking] = useState({
    open: false,
    message: '',
    snackType: 'error'
  });

  // Handle Log In
  const handleLogin = async (e) => {

    e.preventDefault();

    if (values.email === "") {
      setSimpleSnacking({
        open: true,
        message: "Please enter your email",
        snackType: "error"
      });
    } else if (values.password === "") {
      setSimpleSnacking({
        open: true,
        message: "Please enter your password",
        snackType: "error"
      });
    } else {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        setSimpleSnacking({
          open: true,
          message: "You are logged in now...",
          snackType: "success"
        });
      } catch {
        setSimpleSnacking({
          open: true,
          message: "Invalid Credentials",
          snackType: "error"
        });
      }
    }
  }

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
      {/* Snack to display error | success message */}
      <SimpleSnack
        message={SimpleSnacking.message}
        open={SimpleSnacking.open}
        setSimpleSnacking={setSimpleSnacking}
        snackType={SimpleSnacking.snackType}
      />
      <Card
        sx={{
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
            <Box
              component="div"
              sx={{
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: "50%",
                  height: "70%",
                }}
                alt="The house from the offer."
                src="/favicon.ico"
              />
              <Typography component="h1" variant="h5">
                tryApp
              </Typography>
            </Box>
            <Box component="form" noValidate>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="email"
                onChange={handleChange("email")}
                name="email"
                autoComplete="on"
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <NavLink
                to="/accounts/password/reset/"
                style={{
                  float: "right",
                  mt: 1,
                  textDecoration: "none",
                  color: "rgb(0,55,107)",
                }}
              >
                Forgot password?
              </NavLink>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  textTransform: "capitalize",
                  color: "#ffffff",
                }}
                onClick={handleLogin}
              >
                {isFetching ? <CircularProgress sx={{ color: "#ffffff" }} /> : "Log In"}
              </Button>
              <Typography
                component="p"
                variant="p"
                sx={{ textAlign: "center" }}
              >
                Don't have account ?{" "}
                {
                  <NavLink
                    to="/accounts/signup"
                    style={{ textDecoration: "none" }}
                  >
                    Sign up
                  </NavLink>
                }
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
