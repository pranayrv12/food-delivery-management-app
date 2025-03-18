import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../../../Store/Cart/Action'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import { retrieveUserOrders } from '../../../Store/Order/Action'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Card, Grid, Button, Divider, Typography } from '@mui/material'

export default function OrderSuccessPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { order } = useSelector(store => store)

    const [currOrder, setCurrOrder] = useState(null)

    const navigateToHome = () => navigate('/')
    const navigateToOrders = () => navigate('/my-profile/orders')

    useEffect(() => {
        dispatch(clearCart())
        dispatch(retrieveUserOrders())
    }, [dispatch])

    useEffect(() => {
        if (order.orders.length > 0) {
            const latestOrder = order.orders[order.orders.length - 1]
            setCurrOrder(latestOrder)
        }
    }, [order.orders])

    return (
        <div style={{ display: 'flex', padding: '1rem', minHeight: '90vh', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', borderRadius: 2, maxWidth: '700px', padding: '1.80rem', backgroundColor: '#191919', boxShadow: '0px 0px 16px #000000' }}>
                <Box sx={{ gap: '0.50rem', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <CheckCircleOutlineIcon sx={{ color: '#4CBB17', fontSize: '4rem', marginTop: '-0.40rem', marginBottom: '0.20rem' }}></CheckCircleOutlineIcon>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Order Placed Successfully!
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#CB202D', textAlign: 'center', fontSize: '1.125rem', marginTop: '0.20rem' }}>
                        Your order will be delivered soon. Thanks for letting us serve you!
                    </Typography>
                </Box>
                <Box sx={{ borderRadius: 2, padding: '1rem', marginTop: '1.40rem', backgroundColor: '#FFFFFF4D', boxShadow: '0px 2px 12px #000000' }}>
                    <Typography variant='h6' sx={{ color: '#FFFFFF', fontSize: '1.20rem', marginTop: '-0.20rem', marginBottom: '0.80rem' }}>
                        Order Summary
                    </Typography>
                    <Divider sx={{ marginBottom: '1.10rem', backgroundColor: '#FFFFFF' }}></Divider>
                    {currOrder && (
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2' sx={{ color: '#FFBF00', fontSize: '1.125rem' }}>
                                    Order ID :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body2' sx={{ color: '#FFFFFF', textAlign: 'right', fontSize: '1.125rem' }}>
                                    {currOrder.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body2' sx={{ color: '#FFBF00', fontSize: '1.125rem' }}>
                                    Total Items :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body2' sx={{ color: '#FFFFFF', textAlign: 'right', fontSize: '1.125rem' }}>
                                    {currOrder.items.length}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body2' sx={{ color: '#FFBF00', fontSize: '1.125rem' }}>
                                    Total Amount :
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body2' sx={{ color: '#FFFFFF', textAlign: 'right', fontSize: '1.125rem' }}>
                                    ₹{currOrder.totalAmount + 21 + 5 + (currOrder.totalAmount * 0.18)}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Box>
                <Box sx={{ display: 'flex', marginTop: '2rem', justifyContent: 'space-between' }}>
                    <Button
                        variant='contained'
                        onClick={navigateToHome}
                        startIcon={<KeyboardBackspaceIcon></KeyboardBackspaceIcon>}
                        sx={{
                            height: '40px',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            borderColor: '#FFFFFF',
                            backgroundColor: '#0D0D0D',
                            outline: '1px solid #FFFFFF',
                            boxShadow: '0px 0px 12px #000000',
                            transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                            '&:hover': { backgroundColor: '#CB202D', boxShadow: '0px 0px 12px #000000' }
                        }}
                    >
                        Back To Home
                    </Button>
                    <Button
                        variant='contained'
                        onClick={navigateToOrders}
                        startIcon={<ShoppingBagIcon></ShoppingBagIcon>}
                        sx={{
                            height: '40px',
                            color: '#FFFFFF',
                            fontSize: '12px',
                            borderColor: '#FFFFFF',
                            backgroundColor: '#CB202D',
                            outline: '1px solid #FFFFFF',
                            boxShadow: '0px 0px 12px #000000',
                            transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                            '&:hover': { backgroundColor: '#0D0D0D', boxShadow: '0px 0px 12px #000000' }
                        }}
                    >
                        View Your Orders
                    </Button>
                </Box>
            </Card>
            <section>
                <BackdropComponent open={order.loading}></BackdropComponent>
            </section>
        </div>
    )
}
