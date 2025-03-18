import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../Store/Authentication/Action'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export default function CustomerProfilePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { auth } = useSelector(store => store)

    const handleLogout = () => {
        navigate("/")
        dispatch(logout())
    }
    if (auth.user === null) {
        return (
            <BackdropComponent open={true}></BackdropComponent>
        )
    }

    return (
        <div style={{ display: 'flex', minHeight: '80vh', textAlign: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <AccountCircleIcon sx={{ fontSize: '9rem', borderRadius: '50%', boxShadow: '0px 0px 16px #000000' }}></AccountCircleIcon>
                <Typography variant='h5' sx={{ fontWeight: 'bold', paddingY: '1.25rem' }}>{auth.user.name}</Typography>
                <Typography variant='body1'>Email ID : {auth.user.email}</Typography>
                <Button
                    variant='contained'
                    onClick={handleLogout}
                    startIcon={<AccountCircleIcon></AccountCircleIcon>}
                    sx={{
                        color: '#FFFFFF',
                        fontSize: '15px',
                        margin: '2rem 0rem',
                        borderColor: '#FFFFFF',
                        backgroundColor: '#0D0D0D',
                        outline: '2px solid #FFFFFF',
                        boxShadow: '0px 0px 20px #000000',
                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                        '&:hover': { backgroundColor: '#CB202D', boxShadow: '0px 0px 20px #000000' }
                    }}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}
