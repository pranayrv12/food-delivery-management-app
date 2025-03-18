import React from 'react'
import AddressCard from './AddressCard'
import { Fragment, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import LocationOffIcon from '@mui/icons-material/LocationOff'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import { deleteUserAddress } from '../../../Store/Authentication/Action'

export default function AddressesPage() {
    const dispatch = useDispatch()

    const { auth } = useSelector(store => store)

    const [openSnackBar, setOpenSnackBar] = useState(false)

    const handleDeleteUserAddress = (addressId) => {
        dispatch(deleteUserAddress(addressId))
        setOpenSnackBar(true)
    }
    const handleSnackBar = () => setOpenSnackBar(false)

    if (auth.user === null) {
        return (
            <BackdropComponent open={true}></BackdropComponent>
        )
    }

    return (
        <Fragment>
            {auth.user.addresses.length > 0 ? (
                <div style={{ marginLeft: '0.625rem', marginRight: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Box className='py-10' sx={{ textAlign: 'center' }}>
                            <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Your Saved Addresses</Typography>
                            <Typography variant='subtitle1' sx={{ color: '#CB202D', fontSize: '1.25rem', marginTop: '0.625rem' }}>
                                Manage Your Saved Addresses For Smooth Ordering Experience!
                            </Typography>
                        </Box>
                        <div style={{ gap: '1.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {auth.user.addresses.map((item, index) => (
                                <AddressCard
                                    item={item}
                                    key={index}
                                    showButton={false}
                                    handleDeleteAddress={() => handleDeleteUserAddress(item.id)}>
                                </AddressCard>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='space-y-5' style={{ textAlign: 'center' }}>
                        <LocationOffIcon sx={{ width: '14rem', height: '14rem', color: '#CB202D' }}></LocationOffIcon>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '1.90rem' }}>No Saved Addresses!</Typography>
                    </div>
                </div>
            )}
            <section>
                <SnackbarComponent open={openSnackBar} severity={'success'} handleClose={handleSnackBar} message={'Address Deleted Successfully!'}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
