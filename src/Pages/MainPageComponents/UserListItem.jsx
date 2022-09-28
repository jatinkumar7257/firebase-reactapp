import React, { useState, useEffect, useCallback } from "react";

// Import Components
import {
    Box,
    Typography,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
} from "@mui/material";

// Import Icons
import { DoneAll } from "@mui/icons-material";

const UserListItem = ({ chatDetails, handleOpenCurrentChat }) => {


    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                paddingLeft: "0px",
            }}
            button
            onClick={() => handleOpenCurrentChat(chatDetails.userInfo.uid, chatDetails.userInfo)}
        >
            <ListItemAvatar>
                <Avatar alt={chatDetails.userInfo.displayName} src={chatDetails.userInfo.photoURL} />
            </ListItemAvatar>
            <ListItemText
                primary={chatDetails.userInfo.displayName}
                secondary={
                    <Box
                        component="span"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        {
                            (true) && (<DoneAll
                                sx={{ display: "inline", fontSize: "15px", mr: 1 }}
                            />)
                        }
                        <Typography
                            variant="span"
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            
                        </Typography>
                    </Box>
                }
            />
        </ListItem>
    )
}

export default UserListItem;