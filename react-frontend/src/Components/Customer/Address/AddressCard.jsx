import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import { Card, Button, Typography } from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'

export default function AddressCard({ item, showButton, handleDeleteAddress, handleSelectAddress }) {
    return (
        <Card
            sx={{
                width: '16rem',
                height: '14rem',
                display: 'flex',
                padding: '1rem',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#191919',
                justifyContent: 'space-between',
                boxShadow: '0px 0px 16px #000000'
            }}
        >
            <div className='space-x-2' style={{ display: 'flex', alignItems: 'center' }}>
                {item.type === 'Home' ? (
                    <HomeIcon sx={{ color: '#FFFFFF', fontSize: '2rem' }}></HomeIcon>
                ) : item.type === 'Office' ? (
                    <WorkIcon sx={{ color: '#FFFFFF', fontSize: '2rem' }}></WorkIcon>
                ) : (
                    <ApartmentIcon sx={{ color: '#FFFFFF', fontSize: '2rem' }}></ApartmentIcon>
                )}
                <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: '1.125rem', marginBottom: '-0.5rem' }}>{item.type}</Typography>
            </div>
            <Typography variant='body1' style={{ flexGrow: '1', color: '#FFFFFF', marginTop: '1rem', textAlign: 'center' }}>
                {item.streetAddress}, {item.state}, {item.pinCode}, {item.country}
            </Typography>
            {showButton ? (
                <Button
                    fullWidth
                    variant='contained'
                    onClick={() => handleSelectAddress(item)}
                    sx={{
                        color: '#FFFFFF',
                        borderColor: '#FFFFFF',
                        backgroundColor: '#0D0D0D',
                        outline: '1px solid #FFFFFF',
                        boxShadow: '0px 0px 12px #000000',
                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                        '&:hover': { backgroundColor: '#CB202D', boxShadow: '0px 0px 12px #000000' }
                    }}
                >
                    Deliver Here
                </Button>
            ) : (
                <Button
                    fullWidth
                    variant='contained'
                    onClick={() => handleDeleteAddress(item)}
                    sx={{
                        color: '#FFFFFF',
                        borderColor: '#FFFFFF',
                        backgroundColor: '#0D0D0D',
                        outline: '1px solid #FFFFFF',
                        boxShadow: '0px 0px 12px #000000',
                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                        '&:hover': { backgroundColor: '#CB202D', boxShadow: '0px 0px 12px #000000' }
                    }}
                >
                    Delete Address
                </Button>
            )}
        </Card>
    )
}
