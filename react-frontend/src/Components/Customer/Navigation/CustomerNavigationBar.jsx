import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import AuthModal from '../Authentication/AuthModal'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { logout } from '../../../Store/Authentication/Action'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Menu, Badge, Avatar, Button, MenuItem, IconButton } from '@mui/material'

export default function CustomerNavigationBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)

    const { auth, cart } = useSelector(store => store)

    const handleLogout = () => {
        dispatch(logout())
        handleCloseMenu()
    }
    const open = Boolean(anchorEl)

    const navigateToHome = () => {
        navigate("/")
    }
    const navigateToCart = () => {
        navigate("/cart")
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseAuthModal = () => {
        navigate("/")
    }
    const handleClick = () => {
        if (auth.user && auth.user.role === "ROLE_RESTAURANT_OWNER") {
            navigate("/owner/restaurant")
        }
    }
    const navigateToProfile = () => {
        if (auth.user) {
            auth.user.role === "ROLE_RESTAURANT_OWNER" ? navigate("/owner/restaurant") : navigate("/my-profile")
        }
    }

    return (
        <div
            style={{
                zIndex: '70',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                padding: '0.80rem 4rem',
                backgroundColor: '#CB202D',
                justifyContent: 'space-between',
                boxShadow: '0px 0px 6px #000000'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    variant='text'
                    onClick={navigateToHome}
                    sx={{
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        fontSize: '1.34rem',
                        paddingRight: '0.68rem',
                        textTransform: 'capitalize',
                        transition: 'background-color 0.3s ease',
                        '&:hover': { backgroundColor: '#FFFFFF30' }
                    }}
                >
                    <HomeIcon sx={{ fontSize: '1.80rem', marginRight: '0.375rem', marginBottom: '0.20rem' }}></HomeIcon>Home
                </Button>
            </div>
            <div className='space-x-8' style={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
                {auth.user && auth.user.role === "ROLE_CUSTOMER" && (
                    <Button
                        variant='outlined'
                        onClick={() => navigate("/search")}
                        sx={{
                            color: '#FFFFFF',
                            borderRadius: '8px',
                            marginRight: '2rem',
                            fontSize: '1.125rem',
                            borderColor: '#FFFFFF',
                            paddingRight: '1.20rem',
                            textTransform: 'capitalize',
                            transition: 'border-color 0.3s ease, background-color 0.3s ease',
                            '&:hover': { borderColor: '#FFFFFF', backgroundColor: '#FFFFFF30' }
                        }}
                    >
                        <SearchIcon sx={{ marginRight: '0.375rem' }}></SearchIcon>Search
                    </Button>
                )}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {auth.user ? (
                        <span
                            aria-haspopup='true'
                            aria-expanded={open ? 'true' : undefined}
                            style={{ fontWeight: 'normal', cursor: 'pointer' }}
                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                            onClick={auth.user.role === "ROLE_RESTAURANT_OWNER" ? handleOpenMenu : navigateToProfile}
                        >
                            <Avatar
                                sx={{
                                    width: '36px',
                                    height: '36px',
                                    color: '#FFFFFF',
                                    fontSize: '1.50rem',
                                    marginRight: '-0.75rem',
                                    border: '2px solid #FFFFFF',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': { backgroundColor: '#0D0D0D' },
                                    backgroundColor: open ? '#0D0D0D' : '#CB202D'
                                }}
                            >
                                {auth.user.role === "ROLE_RESTAURANT_OWNER" ? <StorefrontIcon></StorefrontIcon> : <AccountCircleIcon></AccountCircleIcon>}
                            </Avatar>
                        </span>
                    ) : (
                        <Button
                            variant='contained'
                            onClick={() => navigate("/account/signin")}
                            sx={{
                                color: '#FFFFFF',
                                fontSize: '15px',
                                borderColor: '#FFFFFF',
                                backgroundColor: '#CB202D',
                                outline: '2px solid #FFFFFF',
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#0D0D0D' }
                            }}
                            startIcon={<AccountCircleIcon></AccountCircleIcon>}
                        >
                            Sign In
                        </Button>
                    )}
                    <Menu
                        open={open}
                        anchorEl={anchorEl}
                        id='Profile Options'
                        disableAutoFocusItem
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                        sx={{
                            '& .MuiMenu-list': {
                                backgroundColor: '#0D0D0D'
                            },
                            '& .MuiMenu-paper': {
                                color: '#FFFFFF',
                                minWidth: '270px',
                                borderRadius: '8px',
                                marginTop: '0.2rem',
                                marginLeft: '0.8rem',
                                boxShadow: '0px 0px 10px #191919'
                            }
                        }}
                    >
                        <MenuItem
                            onClick={handleClick}
                            sx={{
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                                fontSize: '0.96rem',
                                paddingX: '0.80rem',
                                paddingY: '0.70rem',
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#FFFFFF16' }
                            }}
                        >
                            <AccountCircleIcon sx={{ color: '#FFFFFF', fontSize: '1.30rem', marginRight: '10px' }}></AccountCircleIcon>Profile
                        </MenuItem>
                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                color: '#CB202D',
                                fontWeight: 'bold',
                                fontSize: '0.96rem',
                                paddingX: '0.80rem',
                                paddingY: '0.70rem',
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#FFFFFF16' }
                            }}
                        >
                            <LogoutIcon sx={{ color: '#CB202D', fontSize: '1.30rem', marginRight: '10px' }}></LogoutIcon>Logout
                        </MenuItem>
                    </Menu>
                </div>
                {auth.user && auth.user.role === "ROLE_CUSTOMER" && (
                    <IconButton
                        onClick={navigateToCart}
                        sx={{
                            padding: '0.625rem',
                            borderRadius: '50%',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s ease',
                            '&:hover': { backgroundColor: '#FFFFFF30' }
                        }}
                    >
                        <Badge
                            sx={{
                                '& .MuiBadge-badge': {
                                    color: '#CB202D',
                                    fontWeight: 'bold',
                                    fontSize: '0.80rem',
                                    backgroundColor: '#FFFFFF'
                                }
                            }}
                            badgeContent={cart.cartItems.length}
                        >
                            <ShoppingCartIcon sx={{ color: '#FFFFFF', fontSize: '1.80rem' }}></ShoppingCartIcon>
                        </Badge>
                    </IconButton>
                )}
            </div>
            <section>
                <AuthModal handleClose={handleCloseAuthModal}></AuthModal>
            </section>
            <section>
                <BackdropComponent open={auth.loading || cart.loading}></BackdropComponent>
            </section>
        </div>
    )
}
