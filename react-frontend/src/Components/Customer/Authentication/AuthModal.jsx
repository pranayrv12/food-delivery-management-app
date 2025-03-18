import React from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { useSelector } from 'react-redux'
import { Box, Modal } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'

const style = {
    top: '50%',
    width: 400,
    left: '50%',
    borderRadius: 2,
    outline: 'none',
    padding: '1.60rem',
    position: 'absolute',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)'
}

export default function AuthModal({ handleClose }) {
    const location = useLocation()

    const { auth } = useSelector(store => store)

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const handleSnackBar = () => setOpenSnackBar(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState('info')

    useEffect(() => {
        if (auth.success) {
            setSnackbarMessage(auth.success)
            setSnackbarSeverity('success')
            setOpenSnackBar(true)
        } else if (auth.error) {
            setSnackbarMessage(location.pathname === '/account/signin' ? 'Invalid Email ID, or Password!' : 'Another Account is already associated with this Email ID!')
            setSnackbarSeverity('error')
            setOpenSnackBar(true)
        }
    }, [auth.error, auth.success, location.pathname])

    return (
        <Fragment>
            <Modal
                onClose={handleClose}
                sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(35, 44, 51, 0.65)' } }}
                open={location.pathname === "/account/signin" || location.pathname === "/account/signup"}
            >
                <Box sx={style}>
                    {location.pathname === "/account/signup" ? (
                        <SignUpForm></SignUpForm>
                    ) : location.pathname === "/account/signin" ? (
                        <SignInForm></SignInForm>
                    ) : null}
                </Box>
            </Modal>
            <section>
                <SnackbarComponent open={openSnackBar} message={snackbarMessage} severity={snackbarSeverity} handleClose={handleSnackBar}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
