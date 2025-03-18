import React from 'react'
import * as Yup from 'yup'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CloudImages } from '../../../Utils/CloudImages'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import { createRestaurant } from '../../../Store/Restaurant/Action'
import { Box, Grid, Paper, Button, TextField, IconButton, Typography } from '@mui/material'

const initialValues = {
    x: "",
    city: "",
    name: "",
    email: "",
    images: [],
    mobile: "",
    country: "",
    pinCode: "",
    instagram: "",
    cuisineType: "",
    description: "",
    stateProvince: "",
    streetAddress: "",
    openingHours: "Monday - Sunday : 9:00 AM - 11:00 PM"
}

const validationSchema = Yup.object({
    city: Yup.string().required("City is Required!"),
    country: Yup.string().required("Country is Required!"),
    name: Yup.string().required("Restaurant Name is Required!"),
    stateProvince: Yup.string().required("State/Province is Required!"),
    streetAddress: Yup.string().required("Street Address is Required!"),
    description: Yup.string().required("Restaurant Description is Required!"),
    cuisineType: Yup.string().required("Restaurant Cuisine Type is Required!"),
    openingHours: Yup.string().required("Restaurant Opening Hours is Required!"),
    email: Yup.string().email("Invalid Email ID Format!").required("Restaurant Email ID is Required!"),
    pinCode: Yup.string().required("PIN Code is Required!").matches(/^\d{6}$/, "PIN Code must have 6 digits!"),
    mobile: Yup.string().required("Restaurant Mobile No. is Required!").matches(/^\d{10}$/, "Mobile No. must have 10 digits!")
})

export default function CreateRestaurantForm() {
    const dispatch = useDispatch()

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const handleSnackBar = () => setOpenSnackBar(false)

    const [uploadingImage, setUploadingImage] = useState(false)

    const handleSubmit = (values, actions) => {
        const restaurantData = {
            name: values.name,
            images: values.images,
            description: values.description,
            cuisineType: values.cuisineType,
            openingHours: values.openingHours,

            address: {
                city: values.city,
                pinCode: values.pinCode,
                country: values.country,
                stateProvince: values.stateProvince,
                streetAddress: values.streetAddress,
            },
            contactInformation: {
                x: values.x,
                email: values.email,
                mobile: values.mobile,
                instagram: values.instagram
            }
        }
        dispatch(createRestaurant(restaurantData))
        actions.resetForm()
    }
    const handleRemoveImage = (index, formik) => {
        const updatedImages = [...formik.values.images]
        updatedImages.splice(index, 1)
        formik.setFieldValue("images", updatedImages)
    }
    const handleSelectImage = async (event, formik) => {
        const file = event.target.files[0]

        if (file && !file.type.startsWith('image/')) {
            setOpenSnackBar(true)
            return
        }
        setUploadingImage(true)
        const imgURL = await CloudImages(file)
        formik.setFieldValue("images", [...formik.values.images, imgURL])
        setUploadingImage(false)
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', padding: '1.50rem', alignItems: 'center', justifyContent: 'center' }}>
            <Paper
                elevation={3}
                sx={{
                    padding: '2rem',
                    maxWidth: '900px',
                    borderRadius: '8px',
                    backgroundColor: '#191919',
                    border: '1px solid #FFFFFF4D',
                    boxShadow: '0px 0px 16px #000000'
                }}
            >
                <Typography variant='h5' align='center' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: '1.50rem', textTransform: 'uppercase' }}>
                    Create Restaurant
                </Typography>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {formik => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} style={{ gap: '1.25rem', display: 'flex', flexWrap: 'wrap' }}>
                                    <input
                                        type='file'
                                        id='fileInput'
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={(event) => handleSelectImage(event, formik)}>
                                    </input>
                                    <label htmlFor='fileInput' style={{ position: 'relative' }}>
                                        <Box
                                            sx={{
                                                width: '95px',
                                                height: '95px',
                                                display: 'flex',
                                                borderRadius: 1,
                                                cursor: 'pointer',
                                                alignItems: 'center',
                                                position: 'relative',
                                                justifyContent: 'center',
                                                border: '1px solid #FFFFFF',
                                                boxShadow: '0px 0px 12px #000000'
                                            }}
                                        >
                                            <AddCircleIcon style={{ fontSize: '1.8rem' }}></AddCircleIcon>
                                        </Box>
                                    </label>
                                    <Box sx={{ gap: '1rem', display: 'flex', flexWrap: 'wrap' }}>
                                        {formik.values.images.map((image, index) => (
                                            <Box key={index} sx={{ position: 'relative' }}>
                                                <img
                                                    src={image}
                                                    alt={`Restaurant ${index + 1}`}
                                                    style={{ width: '95px', height: '95px', borderRadius: 4, objectFit: 'cover' }}>
                                                </img>
                                                <IconButton
                                                    size='small'
                                                    onClick={() => handleRemoveImage(index, formik)}
                                                    sx={{
                                                        top: '-3px',
                                                        right: '-3px',
                                                        outline: 'none',
                                                        position: 'absolute',
                                                        transition: 'background-color 0.3s ease',
                                                        '&:hover': { backgroundColor: '#FFFFFF30' }
                                                    }}
                                                >
                                                    <HighlightOffIcon sx={{ fontSize: '1.2rem' }}></HighlightOffIcon>
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        id='name'
                                        fullWidth
                                        name='name'
                                        label='Name'
                                        as={TextField}
                                        variant='outlined'
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        sx={{
                                            marginTop: '0.30rem',
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
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        id='description'
                                        name='description'
                                        variant='outlined'
                                        label='Description'
                                        sx={{
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
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={
                                            <ErrorMessage name='description'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        id='cuisineType'
                                        name='cuisineType'
                                        variant='outlined'
                                        label='Cuisine Type'
                                        sx={{
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
                                        error={formik.touched.cuisineType && Boolean(formik.errors.cuisineType)}
                                        helperText={
                                            <ErrorMessage name='cuisineType'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        id='openingHours'
                                        variant='outlined'
                                        name='openingHours'
                                        label='Opening Hours'
                                        sx={{
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
                                        error={formik.touched.openingHours && Boolean(formik.errors.openingHours)}
                                        helperText={
                                            <ErrorMessage name='openingHours'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        id='streetAddress'
                                        variant='outlined'
                                        name='streetAddress'
                                        label='Street Address'
                                        sx={{
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
                                </Grid>
                                <Grid item xs={3}>
                                    <Field
                                        id='city'
                                        fullWidth
                                        name='city'
                                        label='City'
                                        as={TextField}
                                        variant='outlined'
                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                        sx={{
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
                                </Grid>
                                <Grid item xs={3}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        id='stateProvince'
                                        variant='outlined'
                                        name='stateProvince'
                                        label='State/Province'
                                        sx={{
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
                                        error={formik.touched.stateProvince && Boolean(formik.errors.stateProvince)}
                                        helperText={
                                            <ErrorMessage name='stateProvince'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={3}>
                                    <Field
                                        fullWidth
                                        id='pinCode'
                                        as={TextField}
                                        name='pinCode'
                                        label='PIN Code'
                                        variant='outlined'
                                        sx={{
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
                                </Grid>
                                <Grid item xs={3}>
                                    <Field
                                        fullWidth
                                        id='country'
                                        as={TextField}
                                        name='country'
                                        label='Country'
                                        variant='outlined'
                                        sx={{
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
                                        error={formik.touched.country && Boolean(formik.errors.country)}
                                        helperText={
                                            <ErrorMessage name='country'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        id='email'
                                        name='email'
                                        as={TextField}
                                        label='Email ID'
                                        variant='outlined'
                                        sx={{
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
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={
                                            <ErrorMessage name='email'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        id='mobile'
                                        name='mobile'
                                        as={TextField}
                                        label='Mobile No.'
                                        variant='outlined'
                                        sx={{
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
                                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                        helperText={
                                            <ErrorMessage name='mobile'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        id='x'
                                        name='x'
                                        fullWidth
                                        as={TextField}
                                        label='X Profile'
                                        variant='outlined'
                                        error={formik.touched.x && Boolean(formik.errors.x)}
                                        sx={{
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
                                            <ErrorMessage name='x'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        id='instagram'
                                        name='instagram'
                                        variant='outlined'
                                        label='Instagram Profile'
                                        sx={{
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
                                        error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                                        helperText={
                                            <ErrorMessage name='instagram'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    sx={{
                                        width: '320px',
                                        color: '#FFFFFF',
                                        fontSize: '15px',
                                        marginTop: '2rem',
                                        padding: '0.80rem',
                                        borderColor: '#FFFFFF',
                                        backgroundColor: '#CB202D',
                                        outline: '1px solid #FFFFFF',
                                        boxShadow: '0px 0px 12px #000000',
                                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                                        '&:hover': { backgroundColor: '#0D0D0D', boxShadow: '0px 0px 12px #000000' }
                                    }}
                                >
                                    Create Restaurant
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
            <section>
                <BackdropComponent open={uploadingImage}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent severity={'error'} open={openSnackBar} handleClose={handleSnackBar} message={'Invalid Image File Type Selected!'}></SnackbarComponent>
            </section>
        </Box>
    )
}
