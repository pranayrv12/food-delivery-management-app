import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import { Button, Accordion, Typography, AccordionDetails, AccordionSummary } from '@mui/material'

export default function OrderCard({ order, status, deliveryCity, restaurantId, deliveryState, restaurantCity, restaurantName, restaurantOpen, deliveryCountry,
    deliveryPinCode, restaurantCountry, restaurantPinCode, deliveryStreetAddress, restaurantStreetAddress }) {

    const navigate = useNavigate()

    const [done] = useState(status === "DELIVERED")
    const [expanded, setExpanded] = useState(false)

    const handleToggleDetails = () => {
        setExpanded((prev) => !prev)
    }
    const navigateToRestaurant = () => {
        navigate(`/restaurant/${restaurantCity}/${restaurantName}/${restaurantId}`)
    }

    return (
        <Accordion expanded={expanded} sx={{ borderRadius: '8px', margin: '0 !important', backgroundColor: '#191919', '&:before': { display: 'none' }, boxShadow: '0px 0px 16px #000000' }}>
            <AccordionSummary
                id='Order Card'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.75rem 1.15625rem',
                    justifyContent: 'space-between',
                    borderBottom: expanded ? '5px solid #FFFFFF4D' : 'none'
                }}
                expandIcon={<ExpandCircleDownIcon onClick={handleToggleDetails} style={{ color: '#FFFFFF', cursor: 'pointer', fontSize: '1.60rem' }}></ExpandCircleDownIcon>}
            >
                <div style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
                    <img
                        alt={order.menuItem.name}
                        src={order.menuItem.images[0]}
                        style={{
                            width: '8.20rem',
                            height: '8.20rem',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            marginLeft: '0.25rem',
                            boxShadow: '0px 0px 12px #000000'
                        }}>
                    </img>
                    <div style={{ gap: '1.25rem', display: 'flex', maxWidth: '42rem', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: '1.20rem' }}>{order.menuItem.name}</Typography>
                        <Typography variant='body1' sx={{ color: '#FFBF00', fontSize: '1.125rem' }}>₹{order.menuItem.price}</Typography>
                        <div style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
                            <Button
                                variant='contained'
                                sx={{
                                    color: '#FFFFFF',
                                    cursor: 'default',
                                    fontSize: '0.75rem',
                                    borderColor: '#FFFFFF',
                                    backgroundColor: '#CB202D',
                                    outline: '1px solid #FFFFFF',
                                    boxShadow: '0px 0px 12px #000000',
                                    transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                                    '&:hover': { backgroundColor: '#0D0D0D', boxShadow: '0px 0px 12px #000000' }
                                }}
                                startIcon={
                                    done ? (
                                        <TaskAltIcon sx={{ color: '#4CBB17' }}></TaskAltIcon>
                                    ) : (
                                        <NotificationsActiveIcon sx={{ color: '#FFBF00' }}></NotificationsActiveIcon>
                                    )
                                }
                            >
                                {status}
                            </Button>
                            {!restaurantOpen ? (
                                <Button
                                    disabled={true}
                                    variant='contained'
                                    sx={{
                                        fontSize: '0.75rem',
                                        outline: '1px solid #FFFFFF'
                                    }}
                                    startIcon={<CloseIcon></CloseIcon>}
                                >
                                    Restaurant Closed
                                </Button>
                            ) : (
                                <Button
                                    variant='contained'
                                    onClick={navigateToRestaurant}
                                    startIcon={<ArrowOutwardIcon></ArrowOutwardIcon>}
                                    sx={{
                                        color: '#FFFFFF',
                                        fontSize: '0.75rem',
                                        borderColor: '#FFFFFF',
                                        backgroundColor: '#0D0D0D',
                                        outline: '1px solid #FFFFFF',
                                        boxShadow: '0px 0px 12px #000000',
                                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                                        '&:hover': { backgroundColor: '#CB202D', boxShadow: '0px 0px 12px #000000' }
                                    }}
                                >
                                    Visit Restaurant
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '1.25rem 1.50rem', backgroundColor: '#000000' }}>
                <Typography variant='body1' sx={{ color: '#4CBB17', fontSize: '1.125rem', marginBottom: '0.50rem' }}>
                    Ordered From :
                    <span style={{ color: '#FFFFFF', marginLeft: '0.375rem' }}>
                        {restaurantName}
                    </span>
                </Typography>
                <Typography variant='body1' sx={{ color: '#4CBB17', fontSize: '1.125rem', marginBottom: '0.50rem' }}>
                    Restaurant Address :
                    <span style={{ color: '#FFFFFF', marginLeft: '0.375rem' }}>
                        {restaurantStreetAddress}, {restaurantCity}, {restaurantPinCode}, {restaurantCountry}
                    </span>
                </Typography>
                <Typography variant='body1' sx={{ color: '#4CBB17', fontSize: '1.125rem' }}>
                    Delivery Address :
                    <span style={{ color: '#FFFFFF', marginLeft: '0.375rem' }}>
                        {deliveryStreetAddress}, {deliveryCity}, {deliveryState}, {deliveryPinCode}, {deliveryCountry}
                    </span>
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}
