import React, { useState, useEffect, useContext } from "react";

// Import Material UI Prototype
import PropTypes from "prop-types";

// Import Material UI Components
import {
  Box,
  Divider,
  Avatar,
  ListItemIcon,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Stack,
  Drawer,
  Tabs,
  Tab,
  Grid,
  Button
} from "@mui/material";

// Import Icons
import {
  PersonOutlined,
  AddLocationOutlined,
  MailOutlineOutlined,
  ArrowBack,
  DeveloperModeOutlined,
} from "@mui/icons-material";

// Import route
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "./../context/AuthContext";

import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "./../firebase";

// Material UI Tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {

  // React Navigate hook
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  
  // Tabs
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  // For Media drawer
  const [openMeida, setOpenMeida] = useState(false);

  const handleOpenMeida = () => {
    setOpenMeida(true);
  };

  const handleCloseMeida = () => {
    setOpenMeida(false);
  };

  // Getting user ID
  const { userId } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUserDetails = async () => {
      const q = query(
        collection(db, "users"),
        where("uid", "==", userId)
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {
        console.log(err);
      }
    }
    if (userId !== currentUser.uid) {
      getUserDetails()
    } else {
      setUser(currentUser);
    }
  },[])
  
  // Direct Message

  const DirectMessages = () => {
    navigate(`/direct/${userId}`);
  }

  return (
    <>
      {
        user &&
          (
            <Paper elevation={0}>

        {/* Start background image and avatar */}
        <Paper
          sx={{
            width: "100%",
            height: "auto",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            borderBottom: "1px solid #dbdbdb",
          }}
          elevation={0}
        >
          {/* Start background */}
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
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#ffffff",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowBack sx={{ mr: 2 }} onClick={ () => navigate(-1) } />
              <Box component="span">Profile</Box>
            </Typography>
          </Box>
          {/* End background */}

          {/* Start Avatar */}
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
            <Box
              sx={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <Avatar
                alt={user.displayName}
                src={user.photoURL}
                sx={{ width: "62px", height: "62px" }}
              />
            </Box>
            <Typography variant="h5" sx={{ color: "#333", fontSize: "18px" }}>
              {user.displayName}</Typography>
          </Box>
          <Box
            component="div"
            sx={{
              width: "100%",
              height: `${(userId === currentUser.uid) ? '13vh' : '22vh'}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              pb: 2,
              backgroundColor: '#ffffff'
            }}>
            {
              (userId !== currentUser.uid) &&
                  (<Button variant = "contained" sx = {{ flexBasis: '80%', color: '#ffffff' }} onClick={DirectMessages}>
                      Message
                    </Button>
                  )
            }
          </Box>
          {/* End Avatar */}
        </Paper>
        {/* End background image and avatar */}

        {/* Start User Details & Media */}
        <Paper
          sx={{
            position: "fixed",
            width: "100%",
            top: `${(userId === currentUser.uid) ? '39vh' : '48vh'}`,
            height: `calc(100% - ${(userId === currentUser.uid) ? '39vh' : '48vh'})`,
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
            {/* Start Details */}
            <Box
              component="div"
              sx={{ width: "100%", height: "auto", p: 2, pt: 0 }}
            >
              <List dense={true}>
                <ListItem sx={{ pl: 1 }}>
                  <ListItemText
                    primary={
                      <Typography component="p" sx={{ color: "#797c8c" }}>
                        share your beautiful thoughts here
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: "43px" }}>
                    <PersonOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="p" sx={{ color: "#555" }}>
                        {user.displayName}</Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: "43px" }}>
                    <MailOutlineOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="p" sx={{ color: "#555" }}>
                        {user.email}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ pl: 1 }}>
                  <ListItemIcon sx={{ minWidth: "43px" }}>
                    <AddLocationOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography component="p" sx={{ color: "#555" }}>
                        New Delhi, India
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            {/* End Details */}
            <Divider variant="middle" />

            {/* Start Media */}
            <Box
              component="div"
              sx={{ width: "100%", height: "auto", p: 2, pt: 0 }}
            >
              <List dense={true} sx={{ width: "100%" }}>
                {/* Start Media Heading */}
                <ListItem sx={{ pl: 1 }}>
                  <ListItemText
                    primary={
                      <Typography
                        component="p"
                        sx={{ color: "#797c8c", mb: 1 }}
                      >
                        MEDIA
                      </Typography>
                    }
                  />
                </ListItem>
                {/* End Media Heading */}
                
                {/* Start First 3 Medias */}
                <ListItem sx={{ pl: 1, pr: 0, width: "100%" }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    sx={{ width: "100%" }}
                  >
                    <Box
                      component="div"
                      sx={{ width: "90px", height: "80px", mr: 2.5 }}
                    >
                      <img
                        src="https://i.pinimg.com/736x/ef/74/e0/ef74e03c2c4b647da5ec61dff1bdf112.jpg"
                        width="100%"
                        height="100%"
                        alt=""
                        style={{ borderRadius: 5, objectFit: "cover" }}
                      />
                    </Box>
                    <Box
                      component="div"
                      sx={{ width: "90px", height: "80px", mr: 2.5 }}
                    >
                      <img
                        src="https://i.pinimg.com/736x/43/74/f9/4374f985c05d798591223fed9d0c165e.jpg"
                        width="100%"
                        height="100%"
                        alt=""
                        style={{ borderRadius: 5, objectFit: "cover" }}
                      />
                    </Box>
                    <Box
                      component="div"
                      sx={{
                        width: "90px",
                        height: "80px",
                        position: "relative",
                      }}
                      onClick={handleOpenMeida}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          backgroundColor: "rgba(0,0,0,0.5)",
                          color: "#ffffff",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 2,
                        }}
                      >
                        +2
                      </Box>
                      <img
                        src="https://i.pinimg.com/736x/e5/d4/f2/e5d4f2814d9ce759afed78d4dcd2c1cc.jpg"
                        width="100%"
                        height="100%"
                        alt=""
                        style={{ borderRadius: 5, objectFit: "cover" }}
                      />
                    </Box>
                  </Stack>
                </ListItem>
                {/* End First 3 Medias */}
              </List>

              {/* Start Media Drawer */}
              <Drawer
                anchor="right"
                open={openMeida}
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
                    pt: 2,
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
                      px: 2,
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
                      <ArrowBack onClick={handleCloseMeida} sx={{ mr: 2 }} />
                      <Box component="span">Shared</Box>
                    </Typography>
                  </Box>
                  <Box
                    component="div"
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      height: "auto",
                      px: 2,
                      border: "0px",
                    }}
                  >
                    <Tabs
                      value={tabValue}
                      onChange={handleChangeTab}
                      sx={{ flexBasis: "60%" }}
                    >
                      <Tab
                        label="MEDIA"
                        {...a11yProps(0)}
                        sx={{ minWidth: "calc(100%/3)" }}
                      />
                      <Tab
                        label="DOCS"
                        {...a11yProps(1)}
                        sx={{ minWidth: "calc(100%/3)" }}
                      />
                    </Tabs>
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
                    }}
                  >
                    <TabPanel value={tabValue} index={0}>
                      <Grid
                        container
                        rowSpacing={2.5}
                        sx={{ p: 2, pt: 4 }}
                      >
                        <Grid item xs={4}>
                          <Box
                            component="div"
                            sx={{ width: "90px", height: "80px", mr: 2.5 }}
                          >
                            <img
                              src="https://i.pinimg.com/736x/ef/74/e0/ef74e03c2c4b647da5ec61dff1bdf112.jpg"
                              width="100%"
                              height="100%"
                              alt=""
                              style={{ borderRadius: 5, objectFit: "cover" }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            component="div"
                            sx={{ width: "90px", height: "80px", mr: 2.5 }}
                          >
                            <img
                              src="https://i.pinimg.com/736x/43/74/f9/4374f985c05d798591223fed9d0c165e.jpg"
                              width="100%"
                              height="100%"
                              alt=""
                              style={{ borderRadius: 5, objectFit: "cover" }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            component="div"
                            sx={{ width: "90px", height: "80px", mr: 2.5 }}
                          >
                            <img
                              src="https://i.pinimg.com/736x/e5/d4/f2/e5d4f2814d9ce759afed78d4dcd2c1cc.jpg"
                              width="100%"
                              height="100%"
                              alt=""
                              style={{ borderRadius: 5, objectFit: "cover" }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box
                            component="div"
                            sx={{ width: "90px", height: "80px", mr: 2.5 }}
                          >
                            <img
                              src="https://cutewallpaper.org/28/dbz-wallpaper-cool/20810302.jpg"
                              width="100%"
                              height="100%"
                              alt=""
                              style={{ borderRadius: 5, objectFit: "cover" }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                      <Box component="div" sx={{ p: 4 }}>
                        <Typography component="p" sx={{ color: "#797c8c" }}>
                          {" "}
                          <DeveloperModeOutlined sx={{ mr: 1 }} />
                          This Feature is under development please try later !!
                        </Typography>
                      </Box>
                    </TabPanel>
                  </Box>
                </Paper>
              </Drawer>
              {/* End Media Drawer */}
            </Box>
            {/* End Media */}
          </Box>
        </Paper>
        {/* End User Details & Media */}
      </Paper>
          )
      }
    </>
  );
};

export default Profile;
