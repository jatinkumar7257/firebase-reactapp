import React, { useState, useContext, useEffect} from "react";

// Import Components
import {
  Box,
  Typography,
  IconButton,
  TextField,
  List,
  Stack
} from "@mui/material";

// Import Icons
import { Add, Search } from "@mui/icons-material";

// Import Invite Friend Dialog;
import InviteFriend from "./InviteFriend";

// Import User List Item
import UserListItem from './UserListItem';

// Import routes
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {

  // React Navigate hook
  const navigate = useNavigate();

  // For Current Chat Drawer
  const handleOpenCurrentChat = (friendId, u) => {
    navigate(`/direct/${friendId}`);
    dispatch({ type: "CHANGE_USER", payload: u });
  }

  let FriendList = [];

  // For Invite friend dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenInviteFriend = () => {
    setOpenDialog(true);
  };

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

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
        <Stack
          direction="row"
          mt="20px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h5">DIRECT MESSAGES</Typography>
          <IconButton
            aria-label="Add"
            sx={{
              color: "rgba(254,139,58,255)",
              backgroundColor: "RGBA(255, 244, 225, 1)",
              width: "30px",
              height: "30px",
              borderRadius: "5px",
            }}
            onClick={handleOpenInviteFriend}
          >
            <Add />
          </IconButton>
          {/* Invite Friend dialog component */}
          <Box sx={{ position: "absolute" }}>
            <InviteFriend
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
          </Box>
        </Stack>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {
            Object.entries(chats)?.map((chat) => (
              <UserListItem key={chat[0]} chatDetails={chat[1]} handleOpenCurrentChat={handleOpenCurrentChat} />
            ))
          }
        </List>
      </Box>
      {/* This box is used to prevent hiding of above listitem behind the fixed */}
      <Box component="div" sx={{ width: "100%", height: "50px" }} />
    </>
  );
};

export default Home;
