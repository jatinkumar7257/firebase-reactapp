import React from "react";

// Import Material UI Components
import {
  Box,
  Typography
} from "@mui/material";

// Import Icons
import { DeveloperModeOutlined } from "@mui/icons-material";

const ForgetPassword = () => {
  return (
    <Box component="div" sx={{ p: 4 }}>
      <Typography component="p" sx={{ color: "#797c8c" }}>
        {" "}
        <DeveloperModeOutlined sx={{ mr: 1 }} />
        This Feature is under development please try later !!
      </Typography>
    </Box>
  )
}

export default ForgetPassword;