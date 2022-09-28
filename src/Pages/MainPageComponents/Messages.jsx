import React, { useContext, useEffect, useRef } from "react";

// Import Components
import {
    Box,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
} from "@mui/material";

// Import Icons
import {
    DoneAll,
    Done,
} from "@mui/icons-material";

import { AuthContext } from "./../../context/AuthContext";
import { ChatContext } from "./../../context/ChatContext";

const Messages = ({ msgDetails }) => {

    var messageTime = new Date(msgDetails.date.seconds).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgDetails]);

    return (
        (msgDetails.senderId === currentUser.uid) ?
            (
                <ListItem
                    sx={{
                        padding: "0px",
                        mb: 3,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            maxWidth: "90%",
                            display: "inline-flex",
                            position: "realtive",
                            alignItems: "flex-end",
                        }}
                    >
                        <Box component="div">
                            <ListItemText
                                primary={msgDetails.text}
                                sx={{
                                    padding: "12px 20px",
                                    backgroundColor: "RGBA(255, 244, 239, 0.6)",
                                    position: "relative",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgb(15 34 58 / 12%)",
                                    mb: 1.5,
                                }}
                            />
                            <Typography
                                component="h1"
                                variant="h5"
                                style={{
                                    width: "100%",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    color: "#333",
                                    fontSize: "16px",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {
                                    (true) ?
                                        (<DoneAll
                                            sx={{
                                                display: "inline",
                                                fontSize: "15px",
                                                mr: 0.5,
                                            }}
                                        />)
                                        :
                                        (<Done
                                            sx={{
                                                display: "inline",
                                                fontSize: "15px",
                                                mr: 0.5
                                            }}
                                        />)
                                }
                                {"Just Now"}
                            </Typography>
                        </Box>
                    </Box>
                </ListItem>
            )
            :
            (
                <ListItem
                    sx={{ padding: "0px", mb: 3, display: "flex" }}
                >
                    <Box
                        component="div"
                        sx={{
                            maxWidth: "90%",
                            display: "inline-flex",
                            position: "realtive",
                            alignItems: "flex-end",
                        }}
                    >
                        <ListItemAvatar sx={{ minWidth: "46px" }}>
                            <Avatar
                                alt={data.user.displayName}
                                src={data.user.photoURL}
                                sx={{ width: "32px", height: "32px" }}
                            />
                        </ListItemAvatar>
                        <Box component="div">
                            <ListItemText
                                primary={msgDetails.text}
                                sx={{
                                    padding: "12px 20px",
                                    backgroundColor: "#ffffff",
                                    position: "relative",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgb(15 34 58 / 12%)",
                                    mb: 1.5,
                                }}
                            />
                            <Typography
                                component="h1"
                                variant="h5"
                                style={{ color: "#333", fontSize: "16px" }}
                            >
                                {"Just Now"}
                            </Typography>
                        </Box>
                    </Box>
                </ListItem>
            )
    )
}

export default Messages;