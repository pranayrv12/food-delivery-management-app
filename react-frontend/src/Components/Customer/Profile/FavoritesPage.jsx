import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import RestaurantCard from '../Restaurant/RestaurantCard'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function FavoritesPage() {
    const { auth } = useSelector(store => store)

    return (
        <Fragment>
            {auth.favorites.length > 0 ? (
                <div>
                    <Box className='py-10' sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Your Favorites</Typography>
                        <Typography variant='subtitle1' sx={{ color: '#CB202D', fontSize: '1.25rem', marginTop: '0.625rem' }}>
                            Where Your Cravings Meet Your Favorite Restaurants!
                        </Typography>
                    </Box>
                    <div style={{ gap: '1.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {auth.favorites.map((item, index) => (
                            <div key={index} style={{ cursor: item.open ? 'pointer' : 'not-allowed' }}>
                                <RestaurantCard data={item}></RestaurantCard>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='space-y-5' style={{ textAlign: 'center' }}>
                        <FavoriteBorderIcon sx={{ width: '14rem', height: '14rem', color: '#CB202D' }}></FavoriteBorderIcon>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '1.90rem' }}>No Restaurants Favorited!</Typography>
                    </div>
                </div>
            )}
            <section>
                <BackdropComponent open={auth.loading}></BackdropComponent>
            </section>
        </Fragment>
    )
}
