import React, { useState, useEffect, useContext } from "react";

// Import Components
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  TextField,
  Typography,
  Paper,
  Stack,
  Skeleton
} from "@mui/material";

// Import Icons
import {
  Send,
  MoreHorizOutlined,
  EmojiEmotionsOutlined,
  NavigateBefore,
  Attachment,
  CameraAlt,
  Collections,
  MoreVert,
} from "@mui/icons-material";

// Import navigate
import { useNavigate, useParams } from "react-router-dom";

// Import Background Image
import Image from "./../assets/pattern-05.png";

// Import Messages Component
import Messages from "./MainPageComponents/Messages";

import { AuthContext } from "./../context/AuthContext";
import { ChatContext } from "./../context/ChatContext";

import { 
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc, 
  onSnapshot,
  arrayUnion,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "./../firebase";
import { v4 as uuid } from "uuid";

const CurrentChat = () => {

  // React Navigate Hook
  const navigate = useNavigate();

  // get friendId from URL
  const { friendId } = useParams();

  // ? Current Chat States:
  
  // Sending Message
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // ? use for sending message

  // For Checking all data loaded
  const [dataLoaded, setDataLoaded] = useState(false);

  // For drawer
  const [openCurrentChat, setOpenCurrentChat] = useState(false);

  useEffect(() => {
    setOpenCurrentChat(true);
  }, [navigate]);

  const handleCloseCurrentChat = () => {
    setOpenCurrentChat(false);
    navigate(-1);
    // socket.emit("user disconnected", user._id);
  };

  // Attachments toggle
  const [attachment, setAttachment] = useState("-10px");

  // More menu toggle
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Closing more menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { data, dispatch } = useContext(ChatContext);

  const [user, setUser] = useState(null);

  const [img, setImg] = useState(null);
  
  useEffect(() => {

    const getUserDetails = async () => {
      const q = query(
        collection(db, "users"),
        where("uid", "==", friendId)
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
        setDataLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
    if (friendId !== currentUser.uid) {
      getUserDetails()
    } else {
      setUser(currentUser);
    }
  },[friendId])

  console.log(user)

  useEffect(() => {

    const getChat = async () => {
      const userChatId =
      currentUser.uid > user.uid
        ? currentUser.uid
        : currentUser.uid;

        try {
          const res = await getDoc(doc(db, "userChats", userChatId));
          if (res.exists()) {
            let userDetails = Object.entries(res.data())[0][1].userInfo
            dispatch({ type: "CHANGE_USER", payload: user });
          }
        } catch (err) {}
    }
    console.log();
    user && getChat()
  }, [friendId]);

  useEffect(() => {

    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    }
  }, [data.chatId]);

  const viewProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }

  // send message
  const handleSendMessage = async () => {

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
         //create a chat in chats collection
         await setDoc(doc(db, "chats", combinedId), { messages: [] });

         //create user chats
         await updateDoc(doc(db, "userChats", currentUser.uid), {
           [combinedId + ".userInfo"]: {
             uid: user.uid,
             displayName: user.displayName,
             photoURL: user.photoURL,
           },
           [combinedId + ".date"]: serverTimestamp(),
         });
 
         await updateDoc(doc(db, "userChats", user.uid), {
           [combinedId + ".userInfo"]: {
             uid: currentUser.uid,
             displayName: currentUser.displayName,
             photoURL: currentUser.photoURL,
           },
           [combinedId + ".date"]: serverTimestamp(),
         }); 
      }

      if (img) {
        const storageRef = ref(storage, uuid());
  
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on(
          (error) => {
            //TODO:Handle Error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: newMessage,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: newMessage,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        setNewMessage("");
        setImg(null);
      }
  
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text: newMessage,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
  
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text: newMessage,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

    } catch (err) {}

  };

  return (
    <div>
      <Paper>
        <Drawer
          anchor="right"
          open={openCurrentChat}
          PaperProps={{
            sx: { width: "100%", backgroundImage: `${dataLoaded && `url(${Image})` }`, overflow: 'hidden' },
          }}
        >
          {
            (!dataLoaded) ?
              (
                <>
                  <Paper
                    sx={{
                      width: "100%",
                      height: "74px",
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
                        px: 2,
                        border: "0px",
                      }}
                    >
                      <Skeleton variant="rounded" width={38} height={30} sx={{mr: 2}} />

                      <ListItem
                        sx={{
                          paddingLeft: "0px",
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <ListItemAvatar>
                          <Skeleton variant="circular" width={45} height={45} />
                        </ListItemAvatar>
                        <Stack>
                          <Skeleton variant="text" width={100} height={30} />
                          <Skeleton variant="text" width={50} height={25} />
                        </Stack>
                      </ListItem>
                    </Box>
                  </Paper>

                  <Paper
                    sx={{
                      position: "fixed",
                      width: "100%",
                      top: "100px",
                      height: "81.5%",
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
                      <List sx={{ width: "100%", maxWidth: "90%", mx: "auto" }}>
                        {
                          [0,1,2,3].map((key) => (
                            (key%2 != 0) ?
                              (<ListItem
                                sx={{ padding: "0px", mb: 3, display: "flex", justifyContent: "flex-end", }}
                                key={key}
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
                                    <Skeleton variant="rounded" width={150} height={60} />
                                    <Box sx={{
                                      width: "100%",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end"
                                    }}>
                                      <Skeleton variant="text" width={70} height={30} />
                                    </Box>
                                  </Box>
                                </Box>
                              </ListItem>)
                                :
                                (<ListItem
                                  sx={{ padding: "0px", mb: 3, display: "flex" }}
                                key={key}
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
                                      <Skeleton variant="circular" width={32} height={32} />
                                    </ListItemAvatar>
                                    <Box component="div">
                                    <Skeleton variant="rounded" width={150} height={60} />
                                    <Skeleton variant="text" width={70} height={30} sx={{ display: "inline-flex", justifyItems: 'center' }} />
                                    </Box>
                                  </Box>
                                </ListItem>)
                          ))
                        }
                      </List>
                    </Box>
                  </Paper>
                </>
              ) 
                :
              (
                <>
                  {/* Top current chat detials of current chat user */}

                  {
                    user &&
                            (
                              <Paper
                                sx={{
                                  width: "100%",
                                  height: "74px",
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
                                    px: 2,
                                    border: "0px",
                                  }}
                                >
                                  <NavigateBefore
                                    sx={{
                                      ml: 1,
                                      mr: 2,
                                      color: "#ffffff",
                                      fontSize: "30px",
                                      bgcolor: "#ff784e",
                                      padding: "2px 5px",
                                      borderRadius: "5px",
                                    }}
                                    onClick={handleCloseCurrentChat}
                                  />

                                  <ListItem alignItems="flex-start" sx={{ paddingLeft: "0px" }}>
                                    <ListItemAvatar>
                                      <Avatar
                                        alt={user.displayName}
                                        src={user.photoURL}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <Typography
                                          component="h1"
                                          variant="h5"
                                          style={{ color: "#333", fontSize: "16px" }}
                                        >
                                          {" "}
                                          {user.displayName}
                                        </Typography>
                                      }
                                      secondary={"offline"}
                                    />
                                  </ListItem>
                                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                                    <MoreVert />
                                  </IconButton>
                                  <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
                                    }}
                                  >
                                    <MenuItem onClick={() => viewProfile(friendId)}>
                                      View Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>Clear Chat</MenuItem>
                                    <MenuItem onClick={handleClose}>Archive Chat</MenuItem>
                                    <MenuItem onClick={handleClose}>Favourite Chat</MenuItem>
                                  </Menu>
                                </Box>
                              </Paper>
                            )
                  }

                  {/* Messages box of current chat */}

                  <Paper
                    sx={{
                      position: "fixed",
                      width: "100%",
                      top: "74px",
                      height: "81.5%",
                      background: "transparent",
                    }}
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
                      <List sx={{ width: "100%", maxWidth: "90%", mx: "auto" }}>
                        {
                          messages?.map((msg) => (
                            <Messages key={msg.id} msgDetails={msg} />
                          ))
                        }
                      </List>
                    </Box>
                  </Paper>

                  {/* Current Chat functionality */}

                  <Paper
                    sx={{
                      position: "fixed",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      display: "flex",
                      height: "70px",
                      zIndex: 1100,
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={0}
                        alignItems="center"
                        width="95%"
                        height="100%"
                      >
                        <IconButton
                          component="label"
                          sx={{
                            color: "#666",
                            backgroundColor: "transparent",
                            width: "30px",
                            height: "100%",
                          }}
                          onClick={() =>
                            attachment === "-10px"
                              ? setAttachment("70px")
                              : setAttachment("-10px")
                          }
                        >
                          <MoreHorizOutlined />
                        </IconButton>
                        <IconButton
                          component="label"
                          sx={{
                            color: "#666",
                            backgroundColor: "transparent",
                            width: "35px",
                            height: "100%",
                          }}
                        >
                          <EmojiEmotionsOutlined />
                        </IconButton>
                        <TextField
                          variant="standard"
                          InputProps={{
                            disableUnderline: true,
                          }}
                          id="filled-search"
                          placeholder="Type your Message"
                          multiline
                          maxRows={4}
                          type="text"
                          sx={{
                            width: "100%",
                            mx: 1,
                            pt: 0,
                            pb: 0,
                            pl: 1,
                            border: "1px solid #dbdbdb",
                            borderRadius: "5px",
                            overflowY: "auto",
                            maxHeight: "80%",
                            minHeight: "50%",
                          }}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Send
                          sx={{
                            color: "#f2f2f2",
                            fontSize: "35px",
                            bgcolor: "#ff784e",
                            py: 0,
                            px: 0.8,
                            borderRadius: "5px",
                          }}
                          onClick={handleSendMessage}
                        />
                      </Stack>
                    </Box>
                  </Paper>

                  {/* Attachment div */}

                  <Box
                    sx={{
                      backgroundColor: "#ffffff",
                      py: 2,
                      position: "absolute",
                      bottom: attachment,
                      left: 0,
                      right: 0,
                      width: "100%",
                      zIndex: 1000,
                      transition: "all .5s",
                    }}
                  >
                    <Stack direction="row" spacing={6} justifyContent="center">
                      <IconButton
                        aria-label="upload picture"
                        component="label"
                        sx={{
                          color: "rgba(254,139,58,255)",
                          backgroundColor: "RGBA(255, 244, 239, 0.6)",
                          width: "48px",
                          height: "48px",
                        }}
                      >
                        <input hidden accept="*" type="file" />
                        <Attachment />
                      </IconButton>
                      <IconButton
                        aria-label="upload picture"
                        component="label"
                        sx={{
                          color: "rgba(254,139,58,255)",
                          backgroundColor: "RGBA(255, 244, 239, 0.6)",
                          width: "48px",
                          height: "48px",
                        }}
                      >
                        <input hidden accept="image/*" type="file" />
                        <CameraAlt />
                      </IconButton>
                      <IconButton
                        aria-label="upload picture"
                        component="label"
                        sx={{
                          color: "rgba(254,139,58,255)",
                          backgroundColor: "RGBA(255, 244, 239, 0.6)",
                          width: "48px",
                          height: "48px",
                        }}
                      >
                        <input hidden accept="image/*" type="file" />
                        <Collections />
                      </IconButton>
                    </Stack>
                  </Box>
                </>  
              )
          }
        </Drawer>
      </Paper>
    </div>
  );
};

export default CurrentChat;
