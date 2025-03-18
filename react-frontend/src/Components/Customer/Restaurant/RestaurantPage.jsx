import React from 'react'
import { useEffect } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import TodayIcon from '@mui/icons-material/Today'
import MenuItemCard from '../MenuItem/MenuItemCard'
import { useDispatch, useSelector } from 'react-redux'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { retrieveMenuItemsByRestaurantId } from '../../../Store/MenuItem/Action'
import { Box, Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { retrieveRestaurantById, retrieveRestaurantCategories } from '../../../Store/Restaurant/Action'

const menuItemTypes = [
    { label: 'All', value: 'all' },
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Non-Vegetarian', value: 'non_vegetarian' }
]

export default function RestaurantPage() {
    const { id } = useParams()

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const { menu, restaurant } = useSelector(store => store)

    const queryString = decodeURIComponent(location.search)
    const searchParams = new URLSearchParams(queryString)
    const category = searchParams.get('category')

    const menuItemType = searchParams.get('menuItem_type')

    useEffect(() => {
        dispatch(retrieveRestaurantById(id))
        dispatch(retrieveRestaurantCategories(id))
        dispatch(retrieveMenuItemsByRestaurantId({
            restaurantId: id,
            category: category || '',
            vegetarian: menuItemType === 'vegetarian',
            nonvegetarian: menuItemType === 'non_vegetarian'
        }))
    }, [id, dispatch, category, menuItemType])

    const handleFilter = (event, value) => {
        const searchParams = new URLSearchParams(location.search)

        if (value === null) {
            value = 'all'
        } else if (value === 'all') {
            searchParams.delete(event.target.name)
        } else {
            searchParams.set(event.target.name, value)
        }
        const query = searchParams.toString()
        navigate({ search: `?${query}` })
    }
    if (restaurant.restaurant === null) {
        return (
            <BackdropComponent open={true}></BackdropComponent>
        )
    }

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ height: '350px', overflow: 'hidden', borderRadius: '8px', textAlign: 'center', position: 'relative', boxShadow: '0px 0px 16px #000000' }}>
                <img
                    alt={'Restaurant 1'}
                    style={{
                        left: '0',
                        width: '35%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute'
                    }}
                    src={restaurant.restaurant.images[0]}>
                </img>
                <img
                    alt={'Restaurant 2'}
                    style={{
                        right: '0',
                        width: '35%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute'
                    }}
                    src={restaurant.restaurant.images[1]}>
                </img>
                <div
                    style={{
                        left: '50%',
                        width: '30%',
                        color: '#FFFFFF',
                        padding: '1.50rem',
                        textAlign: 'center',
                        position: 'absolute',
                        boxSizing: 'border-box',
                        transform: 'translateX(-50%)'
                    }}
                >
                    <Typography variant='h2' sx={{ fontWeight: 'bold' }}>{restaurant.restaurant.name}</Typography>
                    <div style={{ gap: '1rem', display: 'flex', marginTop: '1rem', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', color: '#FFFFFF', alignItems: 'center' }}>
                            <LocationOnIcon style={{ bottom: '0.0625rem', fontSize: '1.60rem', position: 'relative', verticalAlign: 'middle' }}></LocationOnIcon>
                            <Typography variant='body1' sx={{ fontSize: '1.20rem', marginLeft: '0.50rem' }}>{restaurant.restaurant.address.streetAddress}</Typography>
                        </div>
                        <div style={{ display: 'flex', color: '#4CBB17', alignItems: 'center', marginTop: '-0.20rem' }}>
                            <TodayIcon style={{ fontSize: '1.50rem', position: 'relative', verticalAlign: 'middle' }}></TodayIcon>
                            <Typography variant='body1' sx={{ fontSize: '1.20rem', marginLeft: '0.50rem' }}>{restaurant.restaurant.openingHours}</Typography>
                        </div>
                        <div style={{ display: 'flex', color: '#FFFFFF4D', alignItems: 'center', marginTop: '-0.20rem' }}>
                            <Typography variant='body1' sx={{ fontSize: '1.20rem' }}>{restaurant.restaurant.description}</Typography>
                        </div>
                        <div style={{ gap: '1rem', display: 'flex', color: '#FFBF00', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon style={{ fontSize: '1.50rem', position: 'relative', verticalAlign: 'middle' }}></PhoneIcon>
                                <Typography variant='body1' sx={{ fontSize: '1.20rem', marginLeft: '0.50rem' }}>{restaurant.restaurant.contactInformation.mobile}</Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon style={{ bottom: '1px', fontSize: '1.50rem', position: 'relative', verticalAlign: 'middle' }}></EmailIcon>
                                <Typography variant='body1' sx={{ fontSize: '1.20rem', marginLeft: '0.50rem' }}>{restaurant.restaurant.contactInformation.email}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Box sx={{ textAlign: 'center', paddingTop: '1.40rem' }}>
                <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.78rem' }}>Filter Menu Items</Typography>
            </Box>
            <div style={{ textAlign: 'center' }}>
                <div style={{ gap: '2rem', display: 'flex', padding: '1rem', margin: '0.50rem', justifyContent: 'center' }}>
                    <div
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            textAlign: 'center',
                            display: 'inline-block',
                            backgroundColor: '#191919',
                            boxShadow: '0px 0px 16px #000000'
                        }}
                    >
                        <Typography variant='h5' sx={{ color: '#FFFFFF', textAlign: 'center', marginBottom: '1rem' }}>MENU ITEM TYPE</Typography>
                        <ToggleButtonGroup
                            exclusive
                            name='menuItem_type'
                            value={menuItemType || 'all'}
                            style={{
                                borderRadius: '8px',
                                marginTop: '0.20rem',
                                marginBottom: '1.40rem',
                                backgroundColor: '#191919',
                                border: '1px solid #FFFFFF',
                                boxShadow: '0px 0px 12px #000000'
                            }}
                            onChange={(event, value) => handleFilter({ target: { name: 'menuItem_type' } }, value)}
                        >
                            {menuItemTypes.map((type, index) => (
                                <ToggleButton
                                    key={index}
                                    value={type.value}
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        padding: '0.35rem 1.50rem',
                                        textTransform: 'uppercase',
                                        transition: 'background-color 0.3s ease',
                                        borderRight: index === menuItemTypes.length - 1 ? 'none' : '1px solid #FFFFFF',
                                        color: type.value === 'vegetarian' ? '#4CBB17' : type.value === 'non_vegetarian' ? '#CB202D' : '#FFFFFF'
                                    }}
                                >
                                    {type.label}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </div>
                    <div
                        style={{
                            padding: '1rem',
                            borderRadius: '8px',
                            textAlign: 'center',
                            display: 'inline-block',
                            backgroundColor: '#191919',
                            boxShadow: '0px 0px 16px #000000'
                        }}
                    >
                        <Typography variant='h5' sx={{ color: '#FFFFFF', textAlign: 'center', marginBottom: '1rem' }}>MENU ITEM CATEGORY</Typography>
                        <ToggleButtonGroup
                            exclusive
                            name='category'
                            value={category || 'all'}
                            style={{
                                borderRadius: '8px',
                                marginTop: '0.20rem',
                                marginBottom: '1.40rem',
                                backgroundColor: '#191919',
                                border: '1px solid #FFFFFF',
                                boxShadow: '0px 0px 12px #000000'
                            }}
                            onChange={(event, value) => handleFilter({ target: { name: 'category' } }, value)}
                        >
                            <ToggleButton
                                value='all'
                                style={{
                                    color: '#FFFFFF',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    padding: '0.35rem 1.50rem',
                                    textTransform: 'uppercase',
                                    transition: 'background-color 0.3s ease'
                                }}
                            >
                                All
                            </ToggleButton>
                            {restaurant.categories.map((category, index) => (
                                <ToggleButton
                                    key={index}
                                    value={category.name}
                                    style={{
                                        color: '#FFBF00',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        padding: '0.35rem 1.50rem',
                                        textTransform: 'uppercase',
                                        borderLeft: '1px solid #FFFFFF',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                >
                                    {category.name}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </div>
                </div>
            </div>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.78rem' }}>
                    Restaurant Menu Items
                </Typography>
                <Typography variant='subtitle1' sx={{ color: '#FFFFFF4D', fontSize: '1.2rem', marginTop: '0.625rem' }}>
                    Explore Delicious Offerings by the Restaurant!
                </Typography>
            </Box>
            <Grid container spacing={3} style={{ marginTop: '0.10rem' }}>
                {menu.menuItems.map((item, index) => (
                    <Grid item sm={6} md={4} lg={4} xs={12} key={index}>
                        <MenuItemCard item={item}></MenuItemCard>
                    </Grid>
                ))}
            </Grid>
            <section>
                <BackdropComponent open={menu.loading || restaurant.loading}></BackdropComponent>
            </section>
        </div>
    )
}
