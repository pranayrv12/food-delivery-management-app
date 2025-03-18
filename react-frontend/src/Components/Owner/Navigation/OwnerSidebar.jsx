import React from 'react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info'
import EventIcon from '@mui/icons-material/Event'
import LogoutIcon from '@mui/icons-material/Logout'
import CategoryIcon from '@mui/icons-material/Category'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { logout } from '../../../Store/Authentication/Action'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import { Drawer, Divider, Typography, useMediaQuery } from '@mui/material'

const menu = [
    { title: "Dashboard", icon: <SpaceDashboardIcon></SpaceDashboardIcon>, path: "/" },
    { title: "Orders", icon: <RestaurantIcon></RestaurantIcon>, path: "/orders" },
    { title: "Menu Items", icon: <MenuBookIcon></MenuBookIcon>, path: "/menu" },
    { title: "Ingredients", icon: <ChecklistRtlIcon></ChecklistRtlIcon>, path: "/ingredients" },
    { title: "Menu Item Categories", icon: <CategoryIcon></CategoryIcon>, path: "/category" },
    { title: "Events", icon: <EventIcon></EventIcon>, path: "/event" },
    { title: "Details", icon: <InfoIcon></InfoIcon>, path: "/details" },
    { title: "Logout", icon: <LogoutIcon></LogoutIcon>, path: "/" }
]

export default function OwnerSidebar({ handleClose, open }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isSmallScreen = useMediaQuery("(max-width:1080px)")

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            navigate("/")
            dispatch(logout())
        } else {
            navigate(`/owner/restaurant${item.path}`)
        }
        handleClose()
    }

    return (
        <Fragment>
            <Drawer
                open={open}
                anchor={'left'}
                onClose={handleClose}
                sx={{
                    zIndex: 1,
                    '& .MuiDrawer-paper': {
                        padding: '1rem',
                        color: '#FFFFFF',
                        backgroundColor: '#191919'
                    }
                }}
                variant={isSmallScreen ? 'temporary' : 'permanent'}
            >
                <div style={{ width: '18vw', gap: '0.50rem', display: 'flex', height: '582px', paddingTop: '5rem', fontSize: '1.25rem', flexDirection: 'column', justifyContent: 'center' }}>
                    {menu.map((item, index) => (
                        <Fragment key={index}>
                            <div
                                onClick={() => handleNavigate(item)}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.backgroundColor = item.title === 'Logout' ? '#CB202D' : '#FFFFFF4D'
                                }}
                                onTouchEnd={(e) => {
                                    e.currentTarget.style.backgroundColor = item.title === 'Logout' ? '#CB202D' : '#FFFFFF4D'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.backgroundColor = item.title === 'Logout' ? '#FF4C4C' : '#FFFFFF80'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)'
                                    e.currentTarget.style.backgroundColor = item.title === 'Logout' ? '#0D0D0D' : '#FFFFFF4D'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.02)'
                                    e.currentTarget.style.backgroundColor = item.title === 'Logout' ? '#CB202D' : '#FFFFFF4D'
                                }}
                                style={{
                                    width: '100%',
                                    gap: '1.25rem',
                                    display: 'flex',
                                    color: '#FFFFFF',
                                    cursor: 'pointer',
                                    padding: '1.25rem',
                                    alignItems: 'center',
                                    borderRadius: '0.50rem',
                                    transition: 'all 120ms',
                                    backgroundColor: item.title === 'Logout' ? '#0D0D0D' : '#FFFFFF4D',
                                    boxShadow: item.title === 'Logout' ? '0px 0px 12px #FFFFFF4D' : '0px 0px 12px #000000'
                                }}
                            >
                                {item.icon}
                                <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: '1.25rem' }}>{item.title}</Typography>
                            </div>
                            {index !== menu.length - 1 && <Divider></Divider>}
                        </Fragment>
                    ))}
                </div>
            </Drawer>
        </Fragment>
    )
}
