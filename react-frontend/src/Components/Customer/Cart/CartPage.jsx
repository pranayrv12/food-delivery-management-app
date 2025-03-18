import React from 'react'
import * as Yup from 'yup'
import CartItemCard from './CartItemCard'
import { TotalAmount } from './TotalAmount'
import { isValidOrder } from './isValidOrder'
import AddressCard from '../Address/AddressCard'
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../../../Store/Order/Action'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import { retrieveCartByUserId } from '../../../Store/Cart/Action'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import { Box, Card, Modal, Button, Divider, Container, TextField, Typography, CssBaseline } from '@mui/material'

const initialValues = {
    city: "",
    type: "",
    state: "",
    pinCode: "",
    streetAddress: ""
}

const style = {
    top: '50%',
    width: 400,
    left: '50%',
    borderRadius: 2,
    outline: 'none',
    padding: '1.60rem',
    position: 'absolute',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)'
}

const validationSchema = Yup.object().shape({
    city: Yup.string().required("City is Required!"),
    state: Yup.string().required("State is Required!"),
    type: Yup.string().required("Address Type is Required!"),
    streetAddress: Yup.string().required("Street Address is Required!"),
    pinCode: Yup.string().required("PIN Code is Required!").matches(/^\d{6}$/, "PIN Code must have 6 digits!")
})

export default function CartPage() {
    const dispatch = useDispatch()

    const { auth, cart } = useSelector(store => store)

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [openAddressModal, setOpenAddressModal] = useState(false)

    const handleSnackBar = () => setOpenSnackbar(false)
    const handleOpenAddressModal = () => setOpenAddressModal(true)
    const handleCloseAddressModal = () => setOpenAddressModal(false)

    useEffect(() => {
        dispatch(retrieveCartByUserId())
    }, [dispatch])

    const handleCreateOrderWithNewAddress = (values, actions) => {
        const orderData = {
            deliveryAddress: {
                country: 'India',
                type: values.type,
                city: values.city,
                state: values.state,
                name: auth.user.name,
                pinCode: values.pinCode,
                streetAddress: values.streetAddress
            },
            restaurantId: cart.cartItems[0].menuItem.restaurant.id
        }
        if (isValidOrder(cart.cartItems)) {
            dispatch(createOrder(orderData))
            handleCloseAddressModal()
            actions.resetForm()
        } else {
            setOpenSnackbar(true)
        }
    }

    const handleCreateOrderWithExistingAddress = (deliveryAddress) => {
        const orderData = {
            restaurantId: cart.cartItems[0].menuItem.restaurant.id,
            deliveryAddress: { ...deliveryAddress, country: 'India', name: auth.user.name }
        }
        if (isValidOrder(cart.cartItems)) {
            dispatch(createOrder(orderData))
        } else {
            setOpenSnackbar(true)
        }
    }
    if (auth.user == null) {
        return (
            <BackdropComponent open={true}></BackdropComponent>
        )
    }

    return (
        <Fragment>
            {cart.cartItems.length > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <section style={{ width: '30%', minHeight: '100vh', marginTop: '1.50rem' }}>
                        <div style={{ gap: '1.50rem', display: 'flex', flexDirection: 'column', marginBottom: '0.75rem' }}>
                            {cart.cartItems.map((item, index) => (
                                <CartItemCard item={item} key={index}></CartItemCard>
                            ))}
                        </div>
                        <Divider></Divider>
                        <div className='px-5' style={{ marginBottom: '1rem' }}>
                            <Typography variant='body1' sx={{ color: '#CB202D', marginTop: '1rem', fontSize: '1.125rem', marginBottom: '0.75rem' }}>Bill Details</Typography>
                            <div style={{ gap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant='body1' sx={{ color: '#FFFFFF' }}>Item Total</Typography>
                                    <Typography variant='body1' sx={{ color: '#FFFFFF' }}>₹{TotalAmount(cart.cartItems)}</Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant='body1' sx={{ color: '#FFFFFF' }}>Platform Fee</Typography>
                                    <Typography variant='body1' sx={{ color: '#FFFFFF' }}>₹5</Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant='body1' sx={{ color: '#FFFFFF' }}>Delivery Expenses</Typography>
                                    <Typography variant='body1' sx={{ color: '#FFFFFF' }}>₹21</Typography>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant='body1' sx={{ color: '#FFFFFF' }}>GST & Restaurant Charges</Typography>
                                    <Typography variant='body1' sx={{ color: '#FFFFFF' }}>₹{TotalAmount(cart.cartItems) * 0.18}</Typography>
                                </div>
                            </div>
                        </div>
                        <Divider></Divider>
                        <div className='px-5' style={{ display: 'flex', marginTop: '1rem', marginBottom: '1rem', justifyContent: 'space-between' }}>
                            <Typography variant='body1' sx={{ color: '#CB202D', fontSize: '1.125rem' }}>Total Bill To Pay</Typography>
                            <Typography variant='body1' sx={{ color: '#CB202D', fontSize: '1.125rem' }}>₹{TotalAmount(cart.cartItems) + 5 + 21 + TotalAmount(cart.cartItems) * 0.18}</Typography>
                        </div>
                        <Divider></Divider>
                    </section>
                    <Divider flexItem orientation='vertical'></Divider>
                    <section className='px-5' style={{ width: '70%', display: 'flex', paddingBottom: '2.5rem', justifyContent: 'center' }}>
                        <div>
                            <Typography variant='h5' className='py-10' sx={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>Select Delivery Address</Typography>
                            <div style={{ gap: '1.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {auth.user.addresses.map((item, index) => (
                                    <AddressCard
                                        item={item}
                                        key={index}
                                        showButton={true}
                                        handleSelectAddress={() => handleCreateOrderWithExistingAddress(item)}>
                                    </AddressCard>
                                ))}
                                <Card
                                    sx={{
                                        width: '16rem',
                                        height: '14rem',
                                        display: 'flex',
                                        padding: '1rem',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        backgroundColor: '#FFFFFF',
                                        justifyContent: 'space-between',
                                        boxShadow: '0px 0px 16px #000000'
                                    }}
                                >
                                    <div className='space-x-2' style={{ display: 'flex', alignItems: 'center' }}>
                                        <AddLocationAltIcon sx={{ color: '#0D0D0D', fontSize: '2rem' }}></AddLocationAltIcon>
                                        <Typography variant='h7' sx={{ color: '#0D0D0D', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '-1rem' }}>
                                            ADD NEW ADDRESS
                                        </Typography>
                                    </div>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        onClick={handleOpenAddressModal}
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
                                        Add
                                    </Button>
                                </Card>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='space-y-5' style={{ textAlign: 'center' }}>
                        <RemoveShoppingCartIcon sx={{ width: '14rem', height: '14rem', color: '#CB202D' }}></RemoveShoppingCartIcon>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '1.90rem' }}>Your Cart Is Empty!</Typography>
                    </div>
                </div>
            )}
            <Modal open={openAddressModal} onClose={handleCloseAddressModal} sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(35, 44, 51, 0.65)' } }}>
                <Box sx={style}>
                    <Container component='main' maxWidth='xs'>
                        <CssBaseline>
                            <Typography variant='h5' sx={{ textAlign: 'center', paddingBottom: '1.20rem' }}>Add New Delivery Address</Typography>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleCreateOrderWithNewAddress}
                            >
                                {formik => (
                                    <Form>
                                        <Field
                                            fullWidth
                                            as={TextField}
                                            variant='outlined'
                                            name='streetAddress'
                                            label='Street Address'
                                            sx={{
                                                marginBottom: '1.20rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#FFFFFF'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#FFFFFF'
                                                    }
                                                }
                                            }}
                                            error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                                            helperText={
                                                <ErrorMessage name='streetAddress'>
                                                    {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                                </ErrorMessage>
                                            }>
                                        </Field>
                                        <Field
                                            fullWidth
                                            name='city'
                                            label='City'
                                            as={TextField}
                                            variant='outlined'
                                            error={formik.touched.city && Boolean(formik.errors.city)}
                                            sx={{
                                                marginBottom: '1.20rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#FFFFFF'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#FFFFFF'
                                                    }
                                                }
                                            }}
                                            helperText={
                                                <ErrorMessage name='city'>
                                                    {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                                </ErrorMessage>
                                            }>
                                        </Field>
                                        <Field
                                            fullWidth
                                            name='state'
                                            label='State'
                                            as={TextField}
                                            variant='outlined'
                                            sx={{
                                                marginBottom: '1.20rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#FFFFFF'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#FFFFFF'
                                                    }
                                                }
                                            }}
                                            error={formik.touched.state && Boolean(formik.errors.state)}
                                            helperText={
                                                <ErrorMessage name='state'>
                                                    {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                                </ErrorMessage>
                                            }>
                                        </Field>
                                        <Field
                                            fullWidth
                                            name='pinCode'
                                            as={TextField}
                                            label='PIN Code'
                                            variant='outlined'
                                            sx={{
                                                marginBottom: '1.20rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#FFFFFF'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#FFFFFF'
                                                    }
                                                }
                                            }}
                                            error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                                            helperText={
                                                <ErrorMessage name='pinCode'>
                                                    {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                                </ErrorMessage>
                                            }>
                                        </Field>
                                        <Field
                                            fullWidth
                                            name='type'
                                            as={TextField}
                                            variant='outlined'
                                            label='Address Type'
                                            error={formik.touched.type && Boolean(formik.errors.type)}
                                            sx={{
                                                marginBottom: '1.40rem',
                                                '& .MuiFormLabel-root': {
                                                    '&.Mui-error': {
                                                        color: '#CB202D'
                                                    },
                                                    '&.Mui-focused': {
                                                        color: '#FFFFFF'
                                                    }
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#CB202D'
                                                    },
                                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#FFFFFF'
                                                    }
                                                }
                                            }}
                                            helperText={
                                                <ErrorMessage name='type'>
                                                    {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                                </ErrorMessage>
                                            }>
                                        </Field>
                                        <Button
                                            fullWidth
                                            type='submit'
                                            variant='contained'
                                            sx={{
                                                color: '#FFFFFF',
                                                fontSize: '15px',
                                                padding: '0.80rem',
                                                borderColor: '#FFFFFF',
                                                marginBottom: '0.60rem',
                                                backgroundColor: '#0D0D0D',
                                                outline: '1px solid #FFFFFF',
                                                transition: 'background-color 0.3s ease',
                                                '&:hover': { backgroundColor: '#CB202D' }
                                            }}
                                        >
                                            Deliver Here
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </CssBaseline>
                    </Container>
                </Box>
            </Modal>
            <section>
                <BackdropComponent open={auth.loading || cart.loading}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent severity={'error'} open={openSnackbar} handleClose={handleSnackBar} message={'Orders From Multiple Restaurants Are Not Allowed!'}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
