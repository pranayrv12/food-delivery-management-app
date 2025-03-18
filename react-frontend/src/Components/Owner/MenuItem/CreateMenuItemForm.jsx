import React from 'react'
import * as Yup from 'yup'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloudImages } from '../../../Utils/CloudImages'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { createMenuItem } from '../../../Store/MenuItem/Action'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import { Box, Chip, Grid, Paper, Button, Select, MenuItem, TextField, IconButton, InputLabel, Typography, FormControl, OutlinedInput } from '@mui/material'

const validationSchema = Yup.object({
    name: Yup.string().required("Menu Item Name is Required!"),
    category: Yup.object().required("Menu Item Category is Required!"),
    description: Yup.string().required("Menu Item Description is Required!"),
    price: Yup.number().required("Menu Item Price is Required!").min(0, "Menu Item Price must be greater than or equal to 0!")
})

const initialValues = {
    name: "",
    price: "",
    images: [],
    category: "",
    description: "",
    ingredients: [],
    restaurantId: "",
    vegetarian: true,
}

export default function CreateMenuItemForm() {
    const dispatch = useDispatch()

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const handleSnackBar = () => setOpenSnackBar(false)

    const [uploadingImage, setUploadingImage] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState("")

    const { ingredient, restaurant } = useSelector(store => store)

    const handleRemoveImage = (index, formik) => {
        const updatedImages = [...formik.values.images]
        updatedImages.splice(index, 1)
        formik.setFieldValue("images", updatedImages)
    }
    const handleSelectImage = async (event, formik) => {
        const file = event.target.files[0]

        if (file && !file.type.startsWith('image/')) {
            setSnackbarMessage('Invalid Image File Type Selected!')
            setSnackbarSeverity('error')
            setOpenSnackBar(true)
            return
        }
        setUploadingImage(true)
        const imgURL = await CloudImages(file)
        formik.setFieldValue("images", [...formik.values.images, imgURL])
        setUploadingImage(false)
    }
    const handleSubmit = (values, actions) => {
        const menuItemData = { ...values, restaurantId: restaurant.usersRestaurant.id }
        dispatch(createMenuItem(menuItemData))

        setSnackbarMessage('Menu Item Created Successfully!')
        setSnackbarSeverity('success')
        setOpenSnackBar(true)

        actions.resetForm()
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', padding: '1.50rem', alignItems: 'center', justifyContent: 'center' }}>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 2,
                    padding: '2rem',
                    maxWidth: '900px',
                    backgroundColor: '#191919',
                    border: '1px solid #FFFFFF4D',
                    boxShadow: '0px 0px 16px #000000'
                }}
            >
                <Typography variant='h5' align='center' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: '1.50rem', textTransform: 'uppercase' }}>
                    Create Menu Item
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
                                                    alt={`Menu Item ${index + 1}`}
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
                                        id='price'
                                        name='price'
                                        label='Price'
                                        type='number'
                                        variant='outlined'
                                        as={TextField}
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
                                        error={formik.touched.price && Boolean(formik.errors.price)}
                                        helperText={
                                            <ErrorMessage name='price'>
                                                {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                            </ErrorMessage>
                                        }>
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl
                                        fullWidth
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
                                        error={formik.touched.category && Boolean(formik.errors.category)}
                                    >
                                        <InputLabel id='category'>Menu Item Category</InputLabel>
                                        <Field
                                            as={Select}
                                            id='category'
                                            name='category'
                                            labelId='category'
                                            label='Menu Item Category'
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        color: '#FFFFFF',
                                                        backgroundColor: '#0D0D0D0',
                                                        '& .MuiMenuItem-root': {
                                                            backgroundColor: '#0D0D0D',
                                                            '&:hover': {
                                                                backgroundColor: '#787878'
                                                            },
                                                            transition: 'background-color 0.3s ease'
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            {restaurant.categories.map((item, index) => (
                                                <MenuItem key={index} value={item} sx={{ paddingX: '0.80rem', paddingY: '0.70rem' }}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        <ErrorMessage name='category'>
                                            {message => <Typography variant='caption' style={{ color: '#CB202D', fontSize: '12px', paddingLeft: '1rem', paddingTop: '0.25rem' }}>{message}</Typography>}
                                        </ErrorMessage>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        fullWidth
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
                                    >
                                        <InputLabel id='ingredients'>Ingredients</InputLabel>
                                        <Field
                                            multiple
                                            as={Select}
                                            id='ingredients'
                                            name='ingredients'
                                            label='Ingredients'
                                            labelId='ingredients'
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        color: '#FFFFFF',
                                                        backgroundColor: '#0D0D0D0',
                                                        '& .MuiMenuItem-root': {
                                                            backgroundColor: '#0D0D0D',
                                                            '&:hover': {
                                                                backgroundColor: '#787878'
                                                            },
                                                            transition: 'background-color 0.3s ease'
                                                        }
                                                    }
                                                }
                                            }}
                                            renderValue={(selected) => (
                                                <Box sx={{ gap: '0.25rem', display: 'flex', flexWrap: 'wrap' }}>
                                                    {selected.map((value, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={value.name}
                                                            sx={{
                                                                color: '#FFFFFF',
                                                                backgroundColor: '#0D0D0D',
                                                                border: '1px solid #FFFFFF',
                                                                boxShadow: '0px 0px 16px #000000'
                                                            }}>
                                                        </Chip>
                                                    ))}
                                                </Box>
                                            )}
                                            input={<OutlinedInput label='Ingredients' id='ingredients'></OutlinedInput>}
                                        >
                                            {ingredient.ingredients.map((item, index) => (
                                                <MenuItem key={index} value={item} sx={{ paddingX: '0.80rem', paddingY: '0.70rem' }}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl
                                        fullWidth
                                        variant='outlined'
                                        sx={{
                                            marginTop: '0.20rem',
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
                                    >
                                        <InputLabel id='vegetarian'>Is Menu Item Vegetarian?</InputLabel>
                                        <Field
                                            as={Select}
                                            id='vegetarian'
                                            name='vegetarian'
                                            labelId='vegetarian'
                                            label='Is Menu Item Vegetarian?'
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        color: '#FFFFFF',
                                                        backgroundColor: '#0D0D0D0',
                                                        '& .MuiMenuItem-root': {
                                                            backgroundColor: '#0D0D0D',
                                                            '&:hover': {
                                                                backgroundColor: '#787878'
                                                            },
                                                            transition: 'background-color 0.3s ease'
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            <MenuItem value={true} sx={{ paddingX: '0.80rem', paddingY: '0.70rem' }}>Yes</MenuItem>
                                            <MenuItem value={false} sx={{ paddingX: '0.80rem', paddingY: '0.70rem' }}>No</MenuItem>
                                        </Field>
                                    </FormControl>
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
                                        padding: '0.80rem',
                                        marginTop: '2.20rem',
                                        borderColor: '#FFFFFF',
                                        backgroundColor: '#CB202D',
                                        outline: '1px solid #FFFFFF',
                                        boxShadow: '0px 0px 12px #000000',
                                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                                        '&:hover': { backgroundColor: '#0D0D0D', boxShadow: '0px 0px 12px #000000' }
                                    }}
                                >
                                    Create Menu Item
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
            <section>
                <BackdropComponent open={uploadingImage || ingredient.loading || restaurant.loading}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} message={snackbarMessage} severity={snackbarSeverity} handleClose={handleSnackBar}></SnackbarComponent>
            </section>
        </Box>
    )
}
