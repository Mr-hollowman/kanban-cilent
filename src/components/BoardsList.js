import { Box, Switch, Typography } from '@mui/material'
import React, { useState } from 'react'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { useTheme } from '@emotion/react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import { useDispatch } from 'react-redux';
import { changeTheme } from '../utils/reducers/themeSlice';
import { flexBox } from '../styles/common';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function BoardsList() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const boards = ["platform Launch", "Marketing Plans", "Road Map"];
    const [selected, setSelected] = useState(boards[0])
    const pills = {
        display: 'flex', alignItems: "center", gap: "15px", padding: "10px", color: theme.palette.disabledFont, cursor: 'pointer', marginBottom: "10px"
    }
    return (
        <Box sx={{ overflowY: "auto" ,height:"90vh",minWidth: "250px", maxWidth: "250px", background: theme.palette.mainBackground, borderRight: `1px solid ${theme.palette.borderColor}` }}>
            <div style={{ minHeight: "400px"}}>
                <Typography sx={{ padding: "20px", fontWeight: "bold", fontSize: 15, color: theme.palette.disabledFont }}>ALL BOARDS ({boards.length})</Typography>
                {boards.map((item, index) => {
                    return (<div key={index} onClick={() => setSelected(item)} className={selected === item ? "active" : 'pills'} style={pills}>
                        <DashboardCustomizeOutlinedIcon style={{ marginLeft: "10px" }} />
                        <Typography>{item}</Typography>
                    </div>)
                })}
                <div className='newBoard' style={pills}>
                    <DashboardCustomizeOutlinedIcon style={{ marginLeft: "10px" }} />
                    <Typography> + Create New Board</Typography>
                </div>
            </div>
            <div style={{}}>
                <Box sx={{ background: theme.palette.contentBackground, margin: "20px", padding: 1, ...flexBox, borderRadius: "10px" }}>
                    <LightModeOutlinedIcon />
                    <Switch
                        checked={theme.palette.mode === "dark"}
                        onChange={() => dispatch(changeTheme(theme.palette.mode === "dark" ? "light" : "dark"))} />
                    <NightsStayOutlinedIcon />
                </Box>
                <Box sx={{ ...flexBox, justifyContent: "flex-start", margin: '20px', gap: '10px', color: theme.palette.disabledFont }}>
                    <VisibilityOffOutlinedIcon />
                    <Typography>Hide Sidebar</Typography>
                </Box>
            </div>
        </Box>
    )
}
