import React from 'react'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { createIngredient } from '../../../Store/Ingredient/Action'
import { Button, Select, MenuItem, Container, TextField, InputLabel, Typography, CssBaseline, FormControl } from '@mui/material'

const initialValues = {
    name: "",
    ingredientCategoryId: ""
}

const validationSchema = Yup.object({
    name: Yup.string().required("Ingredient Name is Required!"),
    ingredientCategoryId: Yup.string().required("Ingredient Category is Required!")
})

export default function CreateIngredientForm({ handleClose }) {
    const dispatch = useDispatch()

    const { ingredient, restaurant } = useSelector(store => store)

    const handleSubmit = (values, actions) => {
        const ingredientData = { ...values, restaurantId: restaurant.usersRestaurant.id }
        dispatch(createIngredient(ingredientData))
        actions.resetForm()
        handleClose()
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline></CssBaseline>
            <Typography variant='h5' sx={{ textAlign: 'center', paddingBottom: '1.20rem' }}>Create Ingredient</Typography>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form>
                        <Field
                            id='name'
                            fullWidth
                            name='name'
                            label='Name'
                            as={TextField}
                            variant='outlined'
                            error={formik.touched.name && Boolean(formik.errors.name)}
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
                        <FormControl
                            fullWidth
                            sx={{
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
                            error={formik.touched.ingredientCategoryId && Boolean(formik.errors.ingredientCategoryId)}
                        >
                            <InputLabel id='ingredientCategoryId-label'>Ingredient Category</InputLabel>
                            <Field
                                as={Select}
                                id='ingredientCategoryId'
                                label='Ingredient Category'
                                name='ingredientCategoryId'
                                labelId='ingredientCategoryId-label'
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
                                {ingredient.category.map((item, index) => (
                                    <MenuItem key={index} value={item.id} sx={{ paddingX: '0.80rem', paddingY: '0.70rem' }}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Field>
                            <ErrorMessage name='ingredientCategoryId'>
                                {message => <Typography variant='caption' style={{ color: '#CB202D', fontSize: '12px', paddingLeft: '1rem', paddingTop: '0.25rem' }}>{message}</Typography>}
                            </ErrorMessage>
                        </FormControl>
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
                            Create Ingredient
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}
