import React, { useContext } from "react";
// Import Components
import {
  Box,
  Typography,
  TextField,
  List,
} from "@mui/material";

// Import Icons
import { Search } from "@mui/icons-material";

// Import routes
import { useNavigate } from "react-router-dom";

// Import User List Item
import UserListItem from './UserListItem';

const Archive = () => {

  // React Navigate hook
  const navigate = useNavigate();

  // For Current Chat Drawer
  let userId;
  const handleOpenCurrentChat = (targetConvo) => {
    const friendId = targetConvo.members.find((m) => m !== userId);
    navigate(`/direct/${friendId}`);
  };

  let archiveFriendList;
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 1,
        }}
      >
        <Typography component="h6" variant="h5">
          tryApp
        </Typography>
      </Box>
      <Box
        component="div"
        sx={{
          width: "100%",
          height: "38px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f2f2f2",
          borderRadius: "5px",
          mt: 2,
        }}
      >
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          id="filled-search"
          placeholder="Search here..."
          type="text"
          sx={{
            width: "85%",
            height: "100%",
            pt: 0.5,
            pl: 1,
            border: "none",
            outline: "none",
          }}
        />
        <Search />
      </Box>
      <Box component="div">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {
            archiveFriendList.map((convo) => {
              return <UserListItem key={convo._id} conversationArray={convo} user={userId} handleOpenCurrentChat={handleOpenCurrentChat} />
            })
          }
        </List>
      </Box>

      {/* This box is used to prevent hiding of above listitem behind the fixed */}
      <Box component="div" sx={{ width: "100%", height: "50px" }} />
      
    </>
  );
};

export default Archive;
