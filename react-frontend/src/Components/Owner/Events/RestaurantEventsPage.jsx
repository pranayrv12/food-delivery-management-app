import React from 'react'
import dayjs from 'dayjs'
import * as Yup from 'yup'
import 'dayjs/locale/en-gb'
import EventCard from './EventCard'
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { createEvent, retrieveRestaurantEvents } from '../../../Store/Restaurant/Action'
import { Box, Modal, Button, Container, TextField, Typography, CssBaseline } from '@mui/material'

const initialValues = {
    name: "",
    image: "",
    location: "",
    eventStartDate: null,
    eventExpireDate: null
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

const validationSchema = Yup.object({
    name: Yup.string().required("Event Name is Required!"),
    location: Yup.string().required("Event Location is Required!"),
    image: Yup.string().url("Invalid Image URL!").required("Image URL is Required!")
})

export default function RestaurantEventsPage() {
    const dispatch = useDispatch()

    const { restaurant } = useSelector(store => store)

    const [openEventModal, setEventModal] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState(false)

    const handleSnackBar = () => setOpenSnackBar(false)
    const handleOpenEventModal = () => setEventModal(true)
    const handleCloseEventModal = () => setEventModal(false)

    const handleSubmit = (eventData) => {
        dispatch(createEvent(eventData, restaurant.usersRestaurant.id))
        handleCloseEventModal()
        setOpenSnackBar(true)
    }

    useEffect(() => {
        if (restaurant.usersRestaurant) {
            dispatch(retrieveRestaurantEvents(restaurant.usersRestaurant.id))
        }
    }, [dispatch, restaurant.usersRestaurant])

    return (
        <Fragment>
            <div style={{ gap: '1.25rem', display: 'flex', alignItems: 'center', paddingTop: '1.25rem', justifyContent: 'center', paddingBottom: '1.25rem' }}>
                <Typography variant='h2' sx={{ fontWeight: 'bold', padding: '1.25rem', textAlign: 'center', fontSize: '4.375rem', textTransform: 'uppercase' }}>
                    Restaurant Events
                </Typography>
                <Button
                    type='submit'
                    variant='contained'
                    onClick={handleOpenEventModal}
                    sx={{
                        width: '190px',
                        height: '52px',
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        padding: '0.80rem',
                        borderColor: '#FFFFFF',
                        backgroundColor: '#0D0D0D',
                        outline: '2px solid #FFFFFF',
                        boxShadow: '0px 0px 20px #000000',
                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                        '&:hover': { backgroundColor: '#CB202D', boxShadow: '0px 0px 20px #000000' }
                    }}
                >
                    Create Event
                </Button>
            </div>
            <div style={{ gap: '1.25rem', display: 'flex', flexWrap: 'wrap', paddingLeft: '1.25rem', paddingRight: '1.25rem', justifyContent: 'center' }}>
                {restaurant.restaurantsEvents.map((item, index) => (
                    <EventCard item={item} key={index}></EventCard>
                ))}
            </div>
            <Modal
                open={openEventModal}
                onClose={handleCloseEventModal}
                aria-labelledby='Create Event Modal'
                sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(35, 44, 51, 0.65)' } }}
            >
                <Container component='main' maxWidth='xs'>
                    <CssBaseline></CssBaseline>
                    <Box sx={style}>
                        <Typography variant='h5' sx={{ textAlign: 'center', paddingBottom: '1.20rem' }}>Create Event</Typography>
                        <Formik
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                        >
                            {({ errors, touched, setFieldValue }) => (
                                <Form>
                                    <Field
                                        id='name'
                                        fullWidth
                                        name='name'
                                        label='Name'
                                        as={TextField}
                                        variant='outlined'
                                        error={touched.name && Boolean(errors.name)}
                                        sx={{
                                            paddingBottom: '1.20rem',
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
                                            <ErrorMessage name='name'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                    <Field
                                        fullWidth
                                        id='location'
                                        as={TextField}
                                        name='location'
                                        label='Location'
                                        variant='outlined'
                                        error={touched.location && Boolean(errors.location)}
                                        sx={{
                                            paddingBottom: '1.20rem',
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
                                            <ErrorMessage name='location'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                    <Field
                                        fullWidth
                                        id='image'
                                        name='image'
                                        as={TextField}
                                        label='Image URL'
                                        variant='outlined'
                                        error={touched.image && Boolean(errors.image)}
                                        sx={{
                                            paddingBottom: '1.20rem',
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
                                            <ErrorMessage name='image'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                    <LocalizationProvider adapterLocale='en-gb' dateAdapter={AdapterDayjs}>
                                        <Field name='eventStartDate'>
                                            {({ field }) => (
                                                <DateTimePicker
                                                    value={field.value}
                                                    label='Start Date & Time'
                                                    inputFormat='DD/MM/YYYY hh:mm a'
                                                    renderInput={(props) => <TextField {...props}></TextField>}
                                                    sx={{
                                                        width: '100%',
                                                        paddingBottom: '1.20rem',
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
                                                    onChange={(newValue) => setFieldValue(field.name, dayjs(newValue).format("DD MMMM, YYYY hh:mm A"))}>
                                                </DateTimePicker>
                                            )}
                                        </Field>
                                    </LocalizationProvider>
                                    <LocalizationProvider adapterLocale='en-gb' dateAdapter={AdapterDayjs}>
                                        <Field name='eventExpireDate'>
                                            {({ field }) => (
                                                <DateTimePicker
                                                    value={field.value}
                                                    label='End Date & Time'
                                                    inputFormat='DD/MM/YYYY hh:mm a'
                                                    renderInput={(props) => <TextField {...props}></TextField>}
                                                    sx={{
                                                        width: '100%',
                                                        paddingBottom: '1.50rem',
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
                                                    onChange={(newValue) => setFieldValue(field.name, dayjs(newValue).format("DD MMMM, YYYY hh:mm A"))}>
                                                </DateTimePicker>
                                            )}
                                        </Field>
                                    </LocalizationProvider>
                                    <Button
                                        fullWidth
                                        type='submit'
                                        variant='contained'
                                        sx={{
                                            color: '#FFFFFF',
                                            fontSize: '15px',
                                            padding: '0.80rem',
                                            borderColor: '#FFFFFF',
                                            marginBottom: '0.50rem',
                                            backgroundColor: '#0D0D0D',
                                            outline: '1px solid #FFFFFF',
                                            transition: 'background-color 0.3s ease',
                                            '&:hover': { backgroundColor: '#CB202D' }
                                        }}
                                    >
                                        Create Event
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Container>
            </Modal>
            <section>
                <BackdropComponent open={restaurant.loading}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'success'} handleClose={handleSnackBar} message={'Event Created Successfully!'}></SnackbarComponent>
            </section>
        </Fragment>
    )
}
