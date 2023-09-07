import React from 'react'
import Box from "@mui/material/Box";
import { useTheme } from '@emotion/react';
import { IconButton, Typography } from '@mui/material';
import { flexBox } from '../styles/common';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function NavBar() {
  const theme = useTheme()
  return (
    <Box sx={{ ...flexBox, justifyContent: "space-between", background: theme.palette.mainBackground, padding: "20px", width: "100%", borderBottom: `1px solid ${theme.palette.borderColor}` }}>
      <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
        Platform Launch
      </Typography>
      <Box sx={{ ...flexBox, gap: "15px" }}>
        <Box sx={{ ...flexBox, color: "#fff", gap: "10px", borderRadius: "20px", background: "blue", padding: "10px 15px 10px 15px" }}>
          <Typography sx={{ fontWeight: "bold", fontSize: 15 }}>+</Typography>
          <Typography sx={{ fontWeight: "bold", fontSize: 15 }}>Add New Task</Typography>
        </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
