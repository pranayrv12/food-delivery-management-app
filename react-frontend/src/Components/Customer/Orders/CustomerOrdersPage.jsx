import React from 'react'
import OrderCard from './OrderCard'
import { Fragment, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import NoMealsIcon from '@mui/icons-material/NoMeals'
import { useDispatch, useSelector } from 'react-redux'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import { retrieveUserOrders } from '../../../Store/Order/Action'

export default function CustomerOrdersPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveUserOrders())
    }, [dispatch])

    const { order } = useSelector(store => store)

    return (
        <Fragment>
            {order.orders.length > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Box className='py-10' sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Your Orders</Typography>
                        <Typography variant='subtitle1' sx={{ color: '#CB202D', fontSize: '1.25rem', marginTop: '0.625rem' }}>
                            Your Complete Order History At A Glance.
                        </Typography>
                    </Box>
                    <div style={{ width: '60%', gap: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                        {order.orders.slice().reverse().map((order) =>
                            order.items.map((item, index) =>
                                <OrderCard
                                    key={index}
                                    order={item}
                                    status={order.orderStatus}

                                    deliveryCity={order.deliveryAddress.city}
                                    deliveryState={order.deliveryAddress.state}
                                    deliveryPinCode={order.deliveryAddress.pinCode}
                                    deliveryCountry={order.deliveryAddress.country}
                                    deliveryStreetAddress={order.deliveryAddress.streetAddress}

                                    restaurantId={item.menuItem.restaurant.id}
                                    restaurantOpen={item.menuItem.restaurant.open}
                                    restaurantName={item.menuItem.restaurant.name}
                                    restaurantCity={item.menuItem.restaurant.address.city}
                                    restaurantPinCode={item.menuItem.restaurant.address.pinCode}
                                    restaurantCountry={item.menuItem.restaurant.address.country}
                                    restaurantStreetAddress={item.menuItem.restaurant.address.streetAddress}>
                                </OrderCard>
                            ))}
                    </div>
                </div>
            ) : (
                <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='space-y-5' style={{ textAlign: 'center' }}>
                        <NoMealsIcon sx={{ width: '14rem', height: '14rem', color: '#CB202D' }}></NoMealsIcon>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '1.90rem' }}>No Orders Placed!</Typography>
                    </div>
                </div>
            )}
            <section>
                <BackdropComponent open={order.loading}></BackdropComponent>
            </section>
        </Fragment>
    )
}
