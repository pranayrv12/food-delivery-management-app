import React from 'react'
import { useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteEvent } from '../../../Store/Restaurant/Action'
import { Card, CardMedia, IconButton, Typography, CardActions, CardContent } from '@mui/material'

export default function EventCard({ item, isCustomer }) {
    const dispatch = useDispatch()

    const handleDeleteEvent = () => {
        dispatch(deleteEvent(item.id))
    }

    return (
        <Card
            sx={{
                width: '345px',
                borderRadius: '8px',
                transition: 'all 120ms',
                backgroundColor: '#191919',
                boxShadow: '0px 0px 12px #191919',
                '&:hover': { transform: 'scale(1.02)' }
            }}
        >
            <CardMedia
                image={item.image}
                sx={{
                    height: '180px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '5px',
                    borderTopRightRadius: '5px',
                    boxShadow: '0px 0px 12px #000000'
                }}>
            </CardMedia>
            <CardContent sx={{ padding: '1rem', backgroundColor: '#000000', borderTop: '5px solid #FFFFFF4D' }}>
                <Typography variant='h5' gutterBottom sx={{ color: '#FFFFFF', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {item.restaurant.name}
                </Typography>
                <Typography variant='h6' gutterBottom sx={{ color: '#CB202D', fontWeight: 'medium', textTransform: 'uppercase' }}>
                    {item.name}
                </Typography>
                <div className='py-1'>
                    <Typography sx={{ color: '#FFFFFF', fontSize: '0.94rem' }}>
                        Starts At : <span style={{ color: '#FFBF00', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.eventStartDate}</span>
                    </Typography>
                    <Typography sx={{ color: '#FFFFFF', fontSize: '0.94rem' }}>
                        Ends At : <span style={{ color: '#FFBF00', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.eventExpireDate}</span>
                    </Typography>
                    <Typography sx={{ color: '#FFFFFF', fontSize: '0.94rem' }}>
                        Location : <span style={{ color: '#FFBF00', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.location}</span>
                    </Typography>
                </div>
            </CardContent>
            {!isCustomer && (
                <CardActions sx={{ paddingBottom: '1rem', backgroundColor: '#000000', justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleDeleteEvent} sx={{ transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: '#FFFFFF30' } }}>
                        <DeleteIcon sx={{ color: '#CB202D' }}></DeleteIcon>
                    </IconButton>
                </CardActions>
            )}
        </Card>
    )
}
