import React from 'react'
import Box from "@mui/material/Box";
import { useTheme } from '@emotion/react';
import { IconButton, Typography } from '@mui/material';
import { flexBox } from '../styles/common';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReactComponent as Logo } from '../assets/logo.svg'

export default function NavBar() {
  const theme = useTheme()
  return (
    <Box sx={{ display:'flex', background: theme.palette.mainBackground, borderBottom: `1px solid ${theme.palette.borderColor}` }}>
      <Box sx={{ display: "flex", minWidth:"250px", alignItems: 'center', gap: '20px', borderRight: `1px solid ${theme.palette.borderColor}`,  }}>
        <Logo style={{marginLeft:"20px"}} />
        <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
          Kanban
        </Typography>
      </Box>
      <Box sx={{ ...flexBox, justifyContent: "space-between", width: "100%", padding:"20px"}}>
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
    </Box>
  )
}
