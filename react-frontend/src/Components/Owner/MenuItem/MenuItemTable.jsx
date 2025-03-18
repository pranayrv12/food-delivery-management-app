import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { IngredientCategories } from '../../../Utils/IngredientCategories'
import { deleteMenuItem, updateMenuItemAvailability, retrieveMenuItemsByRestaurantId } from '../../../Store/MenuItem/Action'
import { Box, Card, Table, Avatar, Button, TableRow, TableBody, TableCell, TableHead, CardHeader, IconButton, Typography, TableContainer } from '@mui/material'

export default function MenuItemTable({ isDashboard, name }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const handleSnackBar = () => setOpenSnackBar(false)

    const { menu, ingredient, restaurant } = useSelector(store => store)

    const handleDeleteMenuItem = (menuItemId) => {
        dispatch(deleteMenuItem(menuItemId))
        setOpenSnackBar(true)
    }

    const handleUpdateMenuItemAvailability = (menuItemId) => {
        dispatch(updateMenuItemAvailability(menuItemId))
    }

    useEffect(() => {
        if (restaurant.usersRestaurant) {
            dispatch(retrieveMenuItemsByRestaurantId({
                category: "",
                vegetarian: false,
                nonvegetarian: false,
                restaurantId: restaurant.usersRestaurant.id
            }))
        }
    }, [dispatch, ingredient.update, restaurant.usersRestaurant])

    const items = isDashboard ? [...(menu.menuItems || [])].reverse().slice(0, 9) : menu.menuItems || []

    return (
        <Box width={'100%'}>
            <Card sx={{ boxShadow: '0px 0px 16px #000000' }}>
                <CardHeader
                    title={name}
                    action={!isDashboard && (
                        <IconButton
                            sx={{
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#FFFFFF30' }
                            }}
                            onClick={() => navigate("/owner/restaurant/add-menu")}
                        >
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>
                        </IconButton>
                    )}
                    sx={{ color: '#FFFFFF', textAlign: 'center', backgroundColor: '#CB202D' }}>
                </CardHeader>
                <div style={{ height: '813.4px', overflowY: 'auto', overflowX: 'hidden' }}>
                    <TableContainer>
                        <Table aria-label='Menu Item Table'>
                            <TableHead sx={{ backgroundColor: '#0D0D0D' }}>
                                <TableRow sx={{ height: '58px' }}>
                                    <TableCell sx={{ width: '12%', fontSize: '1rem', fontWeight: 'bold' }}>IMAGE</TableCell>
                                    <TableCell sx={{ width: '20%', fontSize: '1rem', fontWeight: 'bold' }}>MENU ITEM</TableCell>
                                    {!isDashboard && (
                                        <TableCell sx={{ width: '24%', fontSize: '1rem', fontWeight: 'bold' }}>
                                            INGREDIENTS
                                        </TableCell>
                                    )}
                                    <TableCell sx={{ width: '12%', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>PRICE</TableCell>
                                    <TableCell sx={{ width: '18%', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>AVAILABILITY</TableCell>
                                    {!isDashboard && (
                                        <TableCell sx={{ width: '14%', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
                                            DELETE MENU ITEM
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow
                                        hover
                                        key={index}
                                        sx={{
                                            height: '84px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                    >
                                        <TableCell>
                                            <Avatar src={item.images[0]} sx={{ boxShadow: '0px 0px 12px #000000' }}></Avatar>
                                        </TableCell>
                                        <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)}` }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography sx={{ fontSize: '0.875rem' }}>{item.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        {!isDashboard && (
                                            <TableCell>
                                                {Object.keys(IngredientCategories(item.ingredients)).map((category, index) => (
                                                    <div key={index}>
                                                        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>{category}</Typography>
                                                        <div style={{ paddingLeft: '1.25rem' }}>
                                                            {IngredientCategories(item.ingredients)[category].map((ingredient, index) => (
                                                                <div key={index} style={{ gap: '0.25rem', display: 'flex', alignItems: 'center' }}>
                                                                    <HorizontalRuleIcon sx={{ fontSize: '1rem' }}></HorizontalRuleIcon>
                                                                    <div style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
                                                                        <Typography variant='body2'>{ingredient.name}</Typography>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </TableCell>
                                        )}
                                        <TableCell sx={{ textAlign: 'center' }}>₹{item.price}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Button
                                                variant='contained'
                                                onClick={() => handleUpdateMenuItemAvailability(item.id)}
                                                sx={{
                                                    color: '#FFFFFF',
                                                    fontWeight: 'bold',
                                                    borderColor: '#FFFFFF',
                                                    boxShadow: '0px 0px 12px #000000',
                                                    backgroundColor: item.available ? '#4CBB17' : '#CB202D',
                                                    transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                                                    '&:hover': { boxShadow: '0px 0px 12px #000000', backgroundColor: item.available ? '#4CBB17' : '#CB202D' }
                                                }}
                                            >
                                                {item.available ? 'Available' : 'Out Of Stock'}
                                            </Button>
                                        </TableCell>
                                        {!isDashboard && (
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <IconButton
                                                    onClick={() => handleDeleteMenuItem(item.id)}
                                                    sx={{
                                                        transition: 'background-color 0.3s ease',
                                                        '&:hover': { backgroundColor: '#FFFFFF30' }
                                                    }}
                                                >
                                                    <DeleteIcon style={{ color: '#CB202D' }}></DeleteIcon>
                                                </IconButton>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
            <section>
                <BackdropComponent open={menu.loading || ingredient.loading || restaurant.loading}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'success'} handleClose={handleSnackBar} message={'Menu Item Deleted Successfully!'}></SnackbarComponent>
            </section>
        </Box>
    )
}
