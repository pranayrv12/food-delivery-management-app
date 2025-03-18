import './HomePage.css'
import React from 'react'
import { useRef, useEffect } from 'react'
import homePage from '../../Images/homePage.jpg'
import ShieldIcon from '@mui/icons-material/Shield'
import { useDispatch, useSelector } from 'react-redux'
import CarouselSection from '../Carousel/CarouselSection'
import RestaurantCard from '../Restaurant/RestaurantCard'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { retrieveAllRestaurants } from '../../../Store/Restaurant/Action'

export default function HomePage() {
    const dispatch = useDispatch()
    const newSectionRef = useRef(null)

    const { auth, restaurant } = useSelector(store => store)

    const scrollToNewSection = () => {
        newSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (auth.user) {
            dispatch(retrieveAllRestaurants())
        }
    }, [dispatch, auth.user])

    return (
        <div style={{ paddingBottom: '2.5rem' }}>
            <section
                className='banner'
                style={{
                    zIndex: 40,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundImage: `url(${homePage})`
                }}
            >
                <div style={{ zIndex: 10, width: '55vw', textAlign: 'center' }}>
                    <Typography className='py-3' sx={{ zIndex: 10, color: '#FFFFFF', fontSize: '5rem', lineHeight: '1.5', fontWeight: 'bold' }}>
                        Food Delivery Management
                    </Typography>
                    <Typography sx={{ zIndex: 10, color: '#FFFFFF', fontSize: '2rem', lineHeight: '1.4', fontWeight: 'light', paddingBottom: '4rem' }}>
                        Crave It? We Deliver It!
                    </Typography>
                    <div className='py-10' style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', paddingTop: '2.5rem', justifyContent: 'space-between' }}>
                        <div className='space-x-2' style={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon></AccessTimeIcon>
                            <Typography variant='h5' sx={{ color: '#FFFFFF', fontSize: '1.6rem', fontWeight: 'bold' }}>24/7 Delivery</Typography>
                        </div>
                        <div className='space-x-2' style={{ display: 'flex', alignItems: 'center' }}>
                            <StorefrontIcon></StorefrontIcon>
                            <Typography variant='h5' sx={{ color: '#FFFFFF', fontSize: '1.6rem', fontWeight: 'bold' }}>Multiple Restaurants</Typography>
                        </div>
                        <div className='space-x-2' style={{ display: 'flex', alignItems: 'center' }}>
                            <ShieldIcon></ShieldIcon>
                            <Typography variant='h5' sx={{ color: '#FFFFFF', fontSize: '1.6rem', fontWeight: 'bold' }}>Secure Transactions</Typography>
                        </div>
                    </div>
                </div>
                <div className='cover' style={{ top: 0, left: 0, right: 0, position: 'absolute' }}></div>
                <div className='fadout'></div>
                {auth.user && auth.user.role === "ROLE_CUSTOMER" && (
                    <IconButton
                        onClick={scrollToNewSection}
                        sx={{
                            zIndex: '60',
                            color: '#0D0D0D',
                            bottom: '0.625rem',
                            position: 'absolute',
                            backgroundColor: '#FFFFFF',
                            transition: 'background-color 0.3s ease',
                            '&:hover': { backgroundColor: '#CB202D' }
                        }}
                    >
                        <ArrowDownwardIcon sx={{ fontSize: '1.6rem' }}></ArrowDownwardIcon>
                    </IconButton>
                )}
            </section>
            <section ref={newSectionRef}>
                <Box sx={{ textAlign: 'center', paddingTop: '1.40rem' }}>
                    <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>What’s Hot Right Now</Typography>
                    <Typography variant='subtitle1' sx={{ color: '#FFFFFF4D', fontSize: '1.25rem', marginTop: '0.625rem' }}>A Taste of What’s Trending!</Typography>
                </Box>
                <div style={{ padding: '2.50rem', paddingTop: '1.75rem', paddingLeft: '2.50rem', paddingRight: '2.50rem', paddingBottom: '1.75rem' }}>
                    <CarouselSection></CarouselSection>
                </div>
            </section>
            {auth.user && auth.user.role === "ROLE_CUSTOMER" && (
                <section>
                    <Box sx={{ textAlign: 'center', paddingTop: '0.875rem', paddingBottom: '1.75rem' }}>
                        <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Discover Partner Offerings</Typography>
                        <Typography variant='subtitle1' sx={{ color: '#FFFFFF4D', fontSize: '1.25rem', marginTop: '0.625rem' }}>
                            Handpicked Restaurants For Your Convenience!
                        </Typography>
                    </Box>
                    <div style={{ gap: '5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {restaurant.restaurants.map((item, index) => (
                            <div key={index} style={{ cursor: item.open ? 'pointer' : 'not-allowed' }}>
                                <RestaurantCard data={item}></RestaurantCard>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}
