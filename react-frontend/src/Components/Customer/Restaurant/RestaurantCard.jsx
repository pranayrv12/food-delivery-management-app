import React from 'react'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isFavorite } from '../../../Utils/isFavorite'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { addRestaurantToFavorites } from '../../../Store/Authentication/Action'
import { Card, Chip, CardMedia, IconButton, Typography, CardContent } from '@mui/material'

export default function RestaurantCard({ data }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { auth } = useSelector(store => store)

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState('info')

    const handleSnackBar = () => setOpenSnackBar(false)

    const handleAddRestaurantToFavorites = () => {
        const wasFavorite = isFavorite(auth.favorites, data)

        dispatch(addRestaurantToFavorites(data.id))

        setSnackbarSeverity(wasFavorite ? 'error' : 'success')
        setSnackbarMessage(wasFavorite ? 'Restaurant Removed From Your Favorites!' : 'Restaurant Added To Your Favorites!')
        setOpenSnackBar(true)
    }
    const navigateToRestaurant = () => {
        if (data.open) {
            navigate(`/restaurant/${data.city}/${data.name}/${data.id}`)
        }
    }

    return (
        <Fragment>
            <Card
                sx={{
                    width: '345px',
                    borderRadius: '8px',
                    position: 'relative',
                    transition: 'all 120ms',
                    backgroundColor: '#191919',
                    boxShadow: '0px 0px 12px #191919',
                    '&:hover': { transform: 'scale(1.02)' }
                }}
            >
                <div onClick={navigateToRestaurant} style={{ position: 'relative', cursor: data.open ? 'pointer' : 'not-allowed' }}>
                    <CardMedia
                        component='img'
                        image={data.images[0]}
                        sx={{
                            height: '240px',
                            objectFit: 'cover',
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                            boxShadow: '0px 0px 16px #000000'
                        }}>
                    </CardMedia>
                    <Chip
                        size='large'
                        label={data.open ? 'Open' : 'Closed'}
                        sx={{
                            width: '78px',
                            top: '0.50rem',
                            height: '34px',
                            left: '0.50rem',
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            fontSize: '0.90rem',
                            textAlign: 'center',
                            position: 'absolute',
                            boxShadow: '0px 0px 12px #000000',
                            bgcolor: data.open ? '#4CBB17' : '#CB202D'
                        }}>
                    </Chip>
                    <CardContent sx={{ height: '180px', padding: '1rem', backgroundColor: '#000000', borderTop: '5px solid #FFFFFF4D' }}>
                        <Typography variant='h5' gutterBottom sx={{ color: '#FFFFFF', fontWeight: 'bold', textTransform: 'uppercase' }}>
                            {data.name}
                        </Typography>
                        <div className='py-1'>
                            <Typography sx={{ color: '#FFFFFF4D', fontSize: '1.125rem' }}>
                                {data.description.length > 66 ? data.description.substring(0, 66) + "..." : data.description}
                            </Typography>
                            <Typography sx={{ left: '1rem', bottom: '1rem', color: '#FFFFFF4D', fontSize: '1.125rem', position: 'absolute' }}>
                                {data.city}
                            </Typography>
                        </div>
                    </CardContent>
                </div>
                <IconButton onClick={handleAddRestaurantToFavorites} sx={{ zIndex: 10, right: '0.375rem', top: '16.03125rem', position: 'absolute' }}>
                    {isFavorite(auth.favorites, data) ? (<FavoriteIcon sx={{ color: '#CB202D' }}></FavoriteIcon>) : (<FavoriteBorderIcon></FavoriteBorderIcon>)}
                </IconButton>
            </Card>
            <section>
                <BackdropComponent open={auth.loading}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} message={snackbarMessage} severity={snackbarSeverity} handleClose={handleSnackBar}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
