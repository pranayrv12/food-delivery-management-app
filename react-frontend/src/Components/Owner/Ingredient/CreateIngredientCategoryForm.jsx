import React from 'react'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { createIngredientCategory } from '../../../Store/Ingredient/Action'
import { Button, Container, TextField, Typography, CssBaseline } from '@mui/material'

const initialValues = {
    name: ""
}

const validationSchema = Yup.object({
    name: Yup.string().required("Ingredient Category Name is Required!")
})

export default function CreateIngredientCategoryForm({ handleClose }) {
    const dispatch = useDispatch()

    const { restaurant } = useSelector(store => store)

    const handleSubmit = (values, actions) => {
        const ingredientCategoryData = { name: values.name, restaurantId: restaurant.usersRestaurant.id }
        dispatch(createIngredientCategory(ingredientCategoryData))
        actions.resetForm()
        handleClose()
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline></CssBaseline>
            <Typography variant='h5' sx={{ textAlign: 'center', paddingBottom: '1.20rem' }}>Create Ingredient Category</Typography>
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
                                paddingBottom: '1.40rem',
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
                            Create Ingredient Category
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}
