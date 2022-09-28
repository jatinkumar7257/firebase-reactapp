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

import { NavLink, useNavigate } from "react-router-dom";

// Import Simple Snack
import SimpleSnack from "./MainPageComponents/SimpleSnack";

// Import Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {

  // React Navigate hook
  
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

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

  // Handle user signup
  const handleSignUp = async (e) => {

    e.preventDefault();
    var atposition = values.email.indexOf("@");
    var dotposition = values.email.lastIndexOf(".");
      
    if (values.name === "") {
      setSimpleSnacking({
        open: true,
        message: "Please enter your name",
        snackType: "error"
      });
    } else if (values.email === "") {
      setSimpleSnacking({
        open: true,
        message: "Please enter your email",
        snackType: "error"
      });
    } else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= values.email.length) {
      setSimpleSnacking({
        open: true,
        message: "Invalid email address!",
        snackType: "error"
      });
    } else if (values.password === "") {
      setSimpleSnacking({
        open: true,
        message: "Please set the password",
        snackType: "error"
      });
    } else if (values.password.length  < 6) {
      setSimpleSnacking({
        open: true,
        message: "password must have at least 6 characters",
        snackType: "error"
      });
    } else {
      setFetching(true);
      try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
  
        //Update profile
        await updateProfile(res.user, {
          displayName: values.name,
          photoURL: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        });
        //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: values.name,
          email: values.email,
          photoURL: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        });

        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
        setFetching(false);
        navigate("/");
      } catch (err) {
        setSimpleSnacking({
          open: true,
          message: err.response.data.message,
          snackType: "error"
        });
      }      
    }
  };

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
          maxWidth: "95%",
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
                fullWidth
                id="name"
                label="Name"
                name="username"
                value={values.name}
                onChange={handleChange("name")}
                autoComplete="off"
              />
              <TextField
                fullWidth
                id="email"
                label="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange("email")}
                autoComplete="off"
                sx={{ mt: 1, mb: 1 }}
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
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  textTransform: "capitalize",
                  color: "#ffffff",
                }}
                onClick={handleSignUp}
              >
                {fetching ? <CircularProgress sx={{ color: "#ffffff" }}  /> : "Sign up"}
              </Button>
              <Typography
                component="p"
                variant="p"
                sx={{ textAlign: "center" }}
              >
                Already have account ?{" "}
                {
                  <NavLink to="/" style={{ textDecoration: "none" }}>
                    Login
                  </NavLink>
                }
              </Typography>
            </Box>
            {/* Snack to display error | success message */}
            <SimpleSnack
              message={SimpleSnacking.message}
              open={SimpleSnacking.open}
              setSimpleSnacking={setSimpleSnacking}
              snackType={SimpleSnacking.snackType}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
