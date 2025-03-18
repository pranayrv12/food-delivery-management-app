import React from 'react'
import { useEffect } from 'react'
import OrderTable from './OrderTable'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import { retrieveRestaurantOrders } from '../../../Store/Order/Action'
import { Card, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'

const orderStatus = [
    { label: "All", value: "all" },
    { label: "Pending", value: "PENDING" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" }
]

export default function RestaurantOrdersPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { auth, restaurant } = useSelector(store => store)

    const queryString = decodeURIComponent(location.search)
    const searchParams = new URLSearchParams(queryString)
    const filter = searchParams.get("order_status")

    const handleFilter = (value) => {
        const searchParams = new URLSearchParams(location.search)

        if (value === null) {
            value = 'all'
        } else if (value === "all") {
            searchParams.delete("order_status")
        } else {
            searchParams.set("order_status", value)
        }
        const query = searchParams.toString()
        navigate({ search: `?${query}` })
    }

    useEffect(() => {
        dispatch(retrieveRestaurantOrders(restaurant.usersRestaurant.id, filter))
    }, [filter, auth.jwt, dispatch, restaurant.usersRestaurant.id])

    return (
        <div style={{ marginTop: '1.125rem', marginLeft: '0.625rem', marginRight: '1.25rem' }}>
            <Card sx={{ padding: '1.25rem', boxShadow: '0px 0px 16px #000000' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant='h5' style={{ color: '#FFFFFF', marginBottom: '1rem' }}>Order Status</Typography>
                    <ToggleButtonGroup
                        exclusive
                        value={filter || 'all'}
                        style={{
                            borderRadius: '8px',
                            marginTop: '0.50rem',
                            marginBottom: '1.10rem',
                            backgroundColor: '#191919',
                            border: '1px solid #FFFFFF',
                            boxShadow: '0px 0px 12px #000000'
                        }}
                        onChange={(event, value) => handleFilter(value)}
                    >
                        {orderStatus.map((type, index) => (
                            <ToggleButton
                                key={index}
                                value={type.value}
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    padding: '0.35rem 1.50rem',
                                    textTransform: 'uppercase',
                                    transition: 'background-color 0.3s ease',
                                    borderRight: index === orderStatus.length - 1 ? 'none' : '1px solid #FFFFFF',
                                    color: type.value === "PENDING" ? '#CB202D' : type.value === "DELIVERED" ? '#4CBB17' : type.value === "OUT_FOR_DELIVERY" ? '#FFBF00' : '#FFFFFF'
                                }}
                            >
                                {type.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </div>
            </Card>
            <div
                style={{
                    height: '728.6px',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    marginTop: '1.125rem',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    boxShadow: '0px 0px 16px #000000'
                }}
            >
                <OrderTable name={'All Orders'}></OrderTable>
            </div>
            <section>
                <BackdropComponent open={auth.loading || restaurant.loading}></BackdropComponent>
            </section>
        </div>
    )
}
