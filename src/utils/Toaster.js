import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCloseToast } from './reducers/toastSlice'
import { Alert, Snackbar } from '@mui/material'

export default function Toaster() {
    const dispatch = useDispatch()
    const { open, severity, message } = useSelector(state => state.toast)
    const handleClose = () => {
        dispatch(handleCloseToast())
    }
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }} >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
