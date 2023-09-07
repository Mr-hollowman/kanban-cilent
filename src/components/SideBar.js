import React from 'react'
import { useTheme } from '@emotion/react'
import { ReactComponent as Logo } from '../assets/logo.svg'
import { Box, Typography } from '@mui/material';
import BoardsList from './BoardsList';

export default function SideBar() {
    const theme = useTheme()
    return (
        <Box sx={{ width: '100%', background: theme.palette.mainBackground, borderRight: `1px solid ${theme.palette.borderColor}` }}>
            <Box sx={{ display: "flex", alignItems: 'center', gap: '20px', borderBottom: `1px solid ${theme.palette.borderColor}`, padding:'20px 20px 25px 20px' }}>
                <Logo />
                <Typography sx={{ fontSize: 25, fontWeight: "bold" }}>
                    Kanban
                </Typography>
            </Box>
            <Box sx={{}}>
                <BoardsList />
            </Box>
        </Box>
    )
}
