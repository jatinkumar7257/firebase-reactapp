import React, { useState, useContext } from "react";

// Import Material UI Prototype
import PropTypes from "prop-types";

// Import Material UI Components
import {
    Container,
    Box,
    Avatar,
    IconButton,
    Stack,
    Menu,
    MenuItem,
    ListItemIcon,
    Tabs,
    Tab
} from "@mui/material";

// Import Icons
import {
    Favorite as FavoriteIcon,
    FavoriteBorderOutlined,
    Archive as ArchiveIcon,
    ArchiveOutlined,
    Home as HomeIcon,
    HomeOutlined,
    DarkModeOutlined,
    AccountCircleOutlined,
    Settings,
    WbSunnyOutlined,
} from "@mui/icons-material";

// Import Page Components
import Home from "./MainPageComponents/Home";
import Favourite from "./MainPageComponents/Favourite";
import Archive from "./MainPageComponents/Archive";

// Import routes
import { useNavigate } from "react-router-dom";

// Import Authentication Context
import { AuthContext } from './../context/AuthContext';

// Start Material UI Tab

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

// End Material UI Tab


const Main = () => {
    
    // React Navigate hook
    const navigate = useNavigate();
    
    const { currentUser } = useContext(AuthContext);

    // Page Bottom Tabs
    const [tabValue, setTabValue] = useState(0);
    const handleChangeTab = (event, newTabValue) => {
        setTabValue(newTabValue);
    };
    
    // Bottom Profile Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpenProfileMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseProfileMenu = () => {
        setAnchorEl(null);
    };

    // To visit profile
    const viewProfile = (userId) => {
        navigate(`profile/${userId}`)
    }

    return (
        <Container component="div" sx={{ width: "100%", height: "100vh" }}>
            <Box sx={{ width: "100%" }}>
                <TabPanel value={tabValue} index={0}>
                    <Home />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Favourite />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                      <Archive />
                </TabPanel>
                <Stack
                    direction="row"
                    sx={{
                        borderTop: 1,
                        borderColor: "divider",
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        sx={{ flexBasis: "60%" }}
                    >
                        <Tab
                            icon={tabValue === 0 ? <HomeIcon /> : <HomeOutlined />}
                            {...a11yProps(0)}
                            sx={{ minWidth: "calc(100%/3)" }}
                        />
                        <Tab
                            icon={
                                tabValue === 1 ? <FavoriteIcon /> : <FavoriteBorderOutlined />
                            }
                            {...a11yProps(1)}
                            sx={{ minWidth: "calc(100%/3)" }}
                        />
                        <Tab
                            icon={tabValue === 2 ? <ArchiveIcon /> : <ArchiveOutlined />}
                            {...a11yProps(2)}
                            sx={{ minWidth: "calc(100%/3)" }}
                        />
                    </Tabs>
                    <Stack direction="row" sx={{ flexBasis: "40%" }}>
                        <IconButton sx={{ minWidth: "calc(100%/2)" }}>
                            {"bright" === "dark" ? <WbSunnyOutlined /> : <DarkModeOutlined />}
                        </IconButton>
                        <IconButton
                            onClick={handleOpenProfileMenu}
                            size="small"
                            sx={{ minWidth: "calc(100%/2)" }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar
                                alt={currentUser.displayName}
                                src={currentUser.photoURL}
                                sx={{ width: "30px", height: "30px" }}
                            />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleCloseProfileMenu}
                            onClick={handleCloseProfileMenu}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                },
                            }}
                            sx={{ top: "-40px" }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem onClick={() => viewProfile(currentUser.uid)}>
                                <ListItemIcon>
                                    <AccountCircleOutlined fontSize="small" />
                                </ListItemIcon>
                                Profile
                            </MenuItem>

                            <MenuItem onClick={() => navigate("/settings")}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    );
};

export default Main;