import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Card, CardHeader, IconButton, Typography, CardContent } from '@mui/material'

export default function SearchCard({ item }) {
    const navigate = useNavigate()

    const navigateToRestaurant = () => {
        navigate(`/restaurant/${item.restaurant.address.city}/${item.restaurant.name}/${item.restaurant.id}`)
    }

    return (
        <Card style={{ borderRadius: '8px', boxShadow: '0px 0px 12px #191919' }}>
            <CardHeader sx={{ padding: '0.75rem 1.50rem', backgroundColor: '#000000', borderBottom: '5px solid #FFFFFF4D' }}
                title={<Typography variant='body1' sx={{ color: '#CB202D', fontWeight: 'bold', fontSize: '1.34rem' }}> {item.restaurant.name} </Typography>}
                action={
                    <IconButton onClick={navigateToRestaurant} sx={{ transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#FFFFFF30' } }}>
                        <ArrowForwardIosIcon style={{ color: '#CB202D', cursor: 'pointer', fontSize: '1.35rem' }}></ArrowForwardIosIcon>
                    </IconButton>
                }>
            </CardHeader>
            <CardContent sx={{ padding: '1.25rem 1.50rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ gap: '1.25rem', display: 'flex', maxWidth: '42rem', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ fontSize: '1.20rem' }}>{item.name}</Typography>
                        <Typography variant='body1' sx={{ color: '#FFBF00', fontSize: '1.125rem' }}>₹{item.price}</Typography>
                        <Typography variant='body1' sx={{ color: '#4CBB17', fontSize: '1.125rem' }}>{item.description}</Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                        <img
                            alt={item.name}
                            src={item.images[0]}
                            style={{ width: '7.20rem', height: '7.20rem', objectFit: 'cover', borderRadius: '12px', boxShadow: '0px 0px 12px #000000' }}>
                        </img>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
