import React, { useState, useContext } from "react";

// Import Material UI Components
import {
  Box,
  Divider,
  Avatar,
  IconButton,
  ListItemIcon,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Drawer,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle
} from "@mui/material";

// Import Icons
import {
  PersonOutlined,
  Help,
  ArrowBack,
  CameraAlt,
  NavigateNext,
  Edit,
  Logout
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

// Import Authentication Context
import { AuthContext } from '../context/AuthContext'

const genders = ["Male", "Female", "Custome", "Prefer not to say"];

const Settings = () => {
  const navigate = useNavigate(); 

  // For Account Info drawer
  const [openAccountInfo, setOpenAccountInfo] = useState(false);

  const handleOpenAccountInfo = () => {
    setOpenAccountInfo(true);
  };

  const handleCloseAccountInfo = () => {
    setOpenAccountInfo(false);
  };

  // Select Gender
  const [gender, setGender] = useState([]);

  const handleChangeGender = (event) => {
    const {
      target: { value },
    } = event;
    setGender(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // For Log out Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenLogOutDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseLogOutDialog = () => {
    setOpenDialog(false);
  }

  // Use Auth Context
  const { currentUser } = useContext(AuthContext);

  // Handle Logout
  const handleLogout = () => {
    navigate("/logout", { replace: true }); //Redirect to logout page
  };


  console.log(currentUser.photoURL)
  return (
    <>
      <Paper elevation={0}>
        <Paper
          sx={{
            width: "100%",
            height: "38vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            borderBottom: "1px solid #dbdbdb",
          }}
          elevation={0}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              height: "26vh",
              p: 2,
              pl: 1,
              backgroundImage: `url("https://themesbrand.com/doot/layouts/assets/images/small/img-4.jpg")`,
              backgroundOrigin: "center",
              backgroundSize: "100% 100%",
              position: "relative",
            }}
          >
            <IconButton
              aria-label="upload picture"
              component="label"
              sx={{ position: "absolute", top: "15px", right: "10px" }}
            >
              <input hidden accept="image/" type="file" />
              <Edit sx={{ color: "#dbdbdb", fontSize: "18px" }} />
            </IconButton>
            <Typography
              variant="h5"
              sx={{
                color: "#ffffff",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowBack sx={{mr: 2}} onClick={() => navigate(-1)} />
              <Box component="span">Settings</Box>
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "calc(25vh - 30px)",
              pb: 2,
            }}
          >
            <IconButton
              aria-label="upload picture"
              component="label"
              sx={{
                width: "70px",
                height: "70px",
                backgroundColor: "#ffffff",
                position: "relative",
              }}
            >
              <input hidden accept="image/" type="file" />
              <Avatar
                alt={currentUser.displayName}
                src={currentUser.photoURL}
                sx={{ width: "62px", height: "62px" }}
              />
              <CameraAlt
                sx={{
                  position: "absolute",
                  bottom: "5px",
                  right: "0px",
                  fontSize: "18px",
                  color: "#222",
                }}
              />
            </IconButton>
            <Typography variant="h5" sx={{ color: "#333", fontSize: "18px" }}>
              {currentUser.displayName}
            </Typography>
          </Box>
        </Paper>

        <Paper
          sx={{
            position: "fixed",
            width: "100%",
            top: "38vh",
            height: "55%",
            background: "transparent",
          }}
          elevation={0}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              height: "100%",
              background: "transparent",
              overflowY: "auto",
            }}
          >
            <List dense={true}>
              <ListItem sx={{ pl: 1 }} onClick={handleOpenAccountInfo}>
                <ListItemIcon sx={{ minWidth: "43px" }}>
                  <PersonOutlined />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      component="p"
                      sx={{
                        color: "#555",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      Edit Profile
                      <NavigateNext />
                    </Typography>
                  }
                />
              </ListItem>
              {/* <Divider variant="middle" /> */}
              <ListItem sx={{ pl: 1 }} button onClick={handleOpenLogOutDialog}>
                <ListItemIcon sx={{ minWidth: "43px" }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography component="p">
                      Log Out
                    </Typography>
                  }
                />
              </ListItem>
              <Dialog onClose={handleCloseLogOutDialog} open={openDialog}>
                <DialogTitle sx={{ textAlign: 'center' }}>Log out of tryApp?</DialogTitle>
                <List sx={{ pt: 0 }}>
                  <ListItem button onClick={handleLogout} sx={{ color: "rgb(0,55,107)", textAlign: 'center'}}>
                    <ListItemText primary="Log Out" />
                  </ListItem>
                  <Divider />
                  <ListItem autoFocus button onClick={handleCloseLogOutDialog}>
                    <ListItemText primary="Cancel" sx={{ textAlign: 'center' }} />
                  </ListItem>
                </List>
              </Dialog>
              {/* <Divider variant="middle" /> */}
              <ListItem sx={{ pl: 1 }}>
                <ListItemIcon sx={{ minWidth: "43px" }}>
                  <Help />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography component="p" sx={{ color: "#555" }}>
                      Help
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
          <Drawer
            anchor="right"
            open={openAccountInfo}
            PaperProps={{
              sx: { width: "100%", height: "100vh" },
            }}
          >
            <Paper
              sx={{
                width: "100%",
                height: "auto",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                border: "0px",
                boxShadow: "0px 1px 1px 0px rgb(0 0 0 / 5%)",
              }}
            >
              <Box
                component="div"
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "auto",
                  p: 2,
                  border: "0px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#333",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowBack onClick={handleCloseAccountInfo} sx={{ mr: 2 }} />
                  <Box component="span">Edit Profile</Box>
                </Typography>
              </Box>
            </Paper>

            <Paper
              sx={{
                position: "fixed",
                width: "100%",
                top: "74px",
                height: "100%",
                background: "transparent",
              }}
              elevation={0}
            >
              <Box
                component="div"
                sx={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                  overflowY: "auto",
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    height: "60px",
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "cenetr",
                  }}
                >
                  <Typography variant="h5" sx={{ fontSize: "18px" }}>
                    Name
                  </Typography>
                  <TextField
                    variant="outlined"
                    type="text"
                    value={currentUser.displayName}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& input": {
                        p: 0.8,
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    height: "60px",
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "cenetr",
                  }}
                >
                  <Typography variant="h5" sx={{ fontSize: "18px" }}>
                    Bio
                  </Typography>
                  <TextField
                    variant="outlined"
                    value="share your beautiful thoughts here"
                    type="text"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& input": {
                        p: 0.8,
                      },
                    }}
                  />
                </Box>
                <Typography variant="h3" sx={{ fontSize: "18px", mb: 1 }}>
                  Personal Infomation
                </Typography>
                <Box
                  sx={{
                    height: "60px",
                    mb: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "cenetr",
                  }}
                >
                  <Typography variant="h5" sx={{ fontSize: "18px" }}>
                    Email Address
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={currentUser.email}
                    type="email"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& input": {
                        p: 0.8,
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    height: "60px",
                    mb: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "cenetr",
                  }}
                >
                  <Typography variant="h5" sx={{ fontSize: "18px" }}>
                    Phone number
                  </Typography>
                  <TextField
                    variant="outlined"
                    type="number"
                    value="8447651155"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& input": {
                        p: 0.8,
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    height: "60px",
                    mb: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "cenetr",
                  }}
                >
                  <Typography variant="h5" sx={{ fontSize: "18px" }}>
                    Gender
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={gender}
                      onChange={handleChangeGender}
                      sx={{
                        "& .MuiSelect-select ": {
                          p: 0.8,
                        },
                      }}
                    >
                      {genders.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Button variant="contained" sx={{ color: "#ffffff" }}>
                  Submit
                </Button>
              </Box>
            </Paper>
          </Drawer>
        </Paper>
      </Paper>
    </>
  );
};

export default Settings;
