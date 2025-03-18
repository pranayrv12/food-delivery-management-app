import React from 'react'
import { useState } from 'react'
import XIcon from '@mui/icons-material/X'
import { useDispatch, useSelector } from 'react-redux'
import InstagramIcon from '@mui/icons-material/Instagram'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import { updateRestaurantStatus } from '../../../Store/Restaurant/Action'
import { Card, Chip, Grid, Button, CardHeader, Typography, CardContent } from '@mui/material'

export default function RestaurantInformation() {
    const dispatch = useDispatch()

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const handleSnackBar = () => setOpenSnackBar(false)

    const { restaurant } = useSelector(store => store)

    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState('info')

    const handleUpdateRestaurantStatus = () => {
        dispatch(updateRestaurantStatus(restaurant.usersRestaurant.id))

        setSnackbarMessage(restaurant.usersRestaurant.open ? 'Restaurant Is Now Closed!' : 'Restaurant Is Now Open!')
        setSnackbarSeverity(restaurant.usersRestaurant.open ? 'error' : 'success')
        setOpenSnackBar(true)
    }

    return (
        <div style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
            <div className='py-5' style={{ gap: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h2' sx={{ fontWeight: 'bold', padding: '1.25rem', textAlign: 'center', fontSize: '4.375rem', textTransform: 'uppercase' }}>
                    {restaurant.usersRestaurant.name}
                </Typography>
                <Button
                    type='submit'
                    variant='contained'
                    onClick={handleUpdateRestaurantStatus}
                    sx={{
                        width: '110px',
                        height: '52px',
                        color: '#FFFFFF',
                        fontSize: '16px',
                        padding: '0.80rem',
                        fontWeight: 'bold',
                        borderColor: '#FFFFFF',
                        backgroundColor: '#0D0D0D',
                        outline: '2px solid #FFFFFF',
                        boxShadow: '0px 0px 20px #000000',
                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                        '&:hover': { boxShadow: '0px 0px 20px #000000', backgroundColor: restaurant.usersRestaurant.open ? '#CB202D' : '#4CBB17' }
                    }}
                >
                    {restaurant.usersRestaurant.open ? 'Close' : 'Open'}
                </Button>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card sx={{ padding: '0.80rem', borderRadius: '8px', border: '1px solid #FFFFFF4D', boxShadow: '0px 0px 16px #000000' }}>
                        <CardHeader
                            title={<Typography variant='h5' sx={{ color: '#CB202D', fontWeight: 'bold' }}>RESTAURANT INFORMATION</Typography>}>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Owner's Name</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.owner.name}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Restaurant Name</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.name}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Cuisine Type</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.cuisineType}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Opening Hours</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.openingHours}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Status</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Chip
                                            size='large'
                                            label={restaurant.usersRestaurant.open ? 'OPEN' : 'CLOSED'}
                                            sx={{
                                                width: '100px',
                                                height: '34px',
                                                fontWeight: 'bold',
                                                fontSize: '0.90rem',
                                                textAlign: 'center',
                                                marginLeft: '1.50rem',
                                                boxShadow: '0px 0px 12px #000000',
                                                bgcolor: restaurant.usersRestaurant.open ? '#4CBB17' : '#CB202D'
                                            }}>
                                        </Chip>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={5} xs={12}>
                    <Card sx={{ padding: '0.80rem', borderRadius: '8px', border: '1px solid #FFFFFF4D', boxShadow: '0px 0px 16px #000000' }}>
                        <CardHeader
                            title={<Typography variant='h5' sx={{ color: '#CB202D', fontWeight: 'bold' }}>ADDRESS DETAILS</Typography>}>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Street Address</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.address.streetAddress}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>City</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.address.city}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>PIN Code</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.address.pinCode}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Country</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.address.country}</Typography>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={7} xs={12}>
                    <Card sx={{ padding: '0.80rem', borderRadius: '8px', border: '1px solid #FFFFFF4D', boxShadow: '0px 0px 16px #000000' }}>
                        <CardHeader
                            title={<Typography variant='h5' sx={{ color: '#CB202D', fontWeight: 'bold' }}>CONTACT INFORMATION</Typography>}>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Email ID</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{restaurant.usersRestaurant.contactInformation.email}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Mobile No.</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <Typography variant='body1' sx={{ marginLeft: '1.50rem' }}>{" +91 - "}{restaurant.usersRestaurant.contactInformation.mobile}</Typography>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant='body1' sx={{ width: '12rem', fontWeight: 'bold' }}>Social Media Links</Typography>
                                    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '1rem' }}>
                                        <Typography variant='body1'>:</Typography>
                                        <a
                                            target='_blank'
                                            rel='noreferrer'
                                            href={restaurant.usersRestaurant.contactInformation.instagram}
                                        >
                                            <InstagramIcon sx={{ color: '#E1306C', fontSize: '3rem', marginLeft: '1.50rem' }}></InstagramIcon>
                                        </a>
                                        <a
                                            target='_blank'
                                            rel='noreferrer'
                                            style={{ marginLeft: '1rem' }}
                                            href={restaurant.usersRestaurant.contactInformation.x}
                                        >
                                            <XIcon sx={{ color: '#FFFFFF', fontSize: '2.62rem' }}></XIcon>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <section>
                <BackdropComponent open={restaurant.loading}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} message={snackbarMessage} severity={snackbarSeverity} handleClose={handleSnackBar}></SnackbarComponent>
            </section>
        </div>
    )
}
