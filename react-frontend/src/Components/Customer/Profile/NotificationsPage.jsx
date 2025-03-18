import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Card, Button, Typography } from '@mui/material'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { deleteUserNotifications, retrieveUserNotifications } from '../../../Store/Order/Action'

export default function NotificationsPage() {
    const dispatch = useDispatch()

    const { order } = useSelector(store => store)

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const handleSnackBar = () => setOpenSnackBar(false)

    useEffect(() => {
        dispatch(retrieveUserNotifications())
    }, [dispatch])

    const handleDeleteUserNotifications = () => {
        dispatch(deleteUserNotifications())
        setOpenSnackBar(true)
    }

    return (
        <Fragment>
            {order.notifications.length > 0 ? (
                <div className='px-6' style={{ marginLeft: '0.625rem', marginRight: '1.25rem' }}>
                    <Box className='py-10' sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Your Notifications</Typography>
                        <Typography variant='subtitle1' sx={{ color: '#CB202D', fontSize: '1.25rem', marginTop: '0.625rem' }}>
                            Stay Informed About Your Order Progress!
                        </Typography>
                    </Box>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                        <Button
                            type='submit'
                            variant='contained'
                            onClick={handleDeleteUserNotifications}
                            sx={{
                                width: '300px',
                                height: '50px',
                                color: '#FFFFFF',
                                fontSize: '15px',
                                padding: '0.80rem',
                                borderColor: '#FFFFFF',
                                backgroundColor: '#0D0D0D',
                                outline: '1px solid #FFFFFF',
                                boxShadow: '0px 0px 20px #000000',
                                transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#CB202D', boxShadow: '0px 0px 20px #000000' }
                            }}
                        >
                            Clear Notifications
                        </Button>
                    </div>
                    {order.notifications.slice().reverse().map((item, index) => (
                        <Card
                            key={index}
                            sx={{
                                gap: '0.75rem',
                                display: 'flex',
                                color: '#FFFFFF',
                                fontSize: '17.5px',
                                padding: '1.40rem',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                transition: 'all 120ms',
                                backgroundColor: '#191919',
                                boxShadow: '0px 0px 16px #000000',
                                '&:hover': { transform: 'scale(1.008)' }
                            }}
                        >
                            <NotificationsActiveIcon sx={{ color: '#FFBF00', fontSize: '1.5625rem' }}></NotificationsActiveIcon>
                            <Typography variant='body1' sx={{ fontSize: '1.125rem' }}>{item.message}</Typography>
                        </Card>
                    ))}
                </div>
            ) : (
                <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='space-y-5' style={{ textAlign: 'center' }}>
                        <NotificationsOffIcon sx={{ width: '14rem', height: '14rem', color: '#CB202D' }}></NotificationsOffIcon>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '1.90rem' }}>No New Notifications!</Typography>
                    </div>
                </div>
            )}
            <section>
                <BackdropComponent open={order.loading}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'success'} handleClose={handleSnackBar} message={'All Notifications Cleared Successfully!'}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
