import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import React from 'react'

export default function TodoContainer() {
    const theme = useTheme()
  return (
    <Box sx={{width:'100%', height:"100vh", background:theme.palette.contentBackground}}>
        nothin
    </Box>
  )
}
