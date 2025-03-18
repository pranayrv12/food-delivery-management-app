import React from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { signInUser } from '../../../Store/Authentication/Action'
import { Button, Container, TextField, Typography, CssBaseline } from '@mui/material'

const initialValues = {
    email: "",
    password: ""
}

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email ID Format!").required("Email ID is Required!"),
    password: Yup.string().required("Password is Required!").min(6, "Password must have at least 6 characters!")
})

export default function SignInForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (signInData) => {
        dispatch(signInUser(signInData, navigate))
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline></CssBaseline>
            <Typography variant='h5' sx={{ textAlign: 'center', paddingBottom: '1.20rem' }}>Sign In To Your Account</Typography>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form>
                        <Field
                            fullWidth
                            id='email'
                            name='email'
                            as={TextField}
                            label='Email ID'
                            variant='outlined'
                            autoComplete='email'
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
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={
                                <ErrorMessage name='email'>
                                    {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                </ErrorMessage>
                            }>
                        </Field>
                        <Field
                            fullWidth
                            id='password'
                            as={TextField}
                            name='password'
                            type='password'
                            label='Password'
                            variant='outlined'
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
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={
                                <ErrorMessage name='password'>
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
                                backgroundColor: '#0D0D0D',
                                outline: '1px solid #FFFFFF',
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#CB202D' }
                            }}
                        >
                            Sign In
                        </Button>
                    </Form>
                )}
            </Formik>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.80rem', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: '0.50rem' }}>Don’t have an account?</Typography>
                <Button
                    variant='contained'
                    onClick={() => navigate("/account/signup")}
                    sx={{
                        color: '#FFFFFF',
                        fontSize: '13px',
                        borderColor: '#FFFFFF',
                        backgroundColor: '#0D0D0D',
                        outline: '1px solid #FFFFFF',
                        transition: 'background-color 0.3s ease',
                        '&:hover': { backgroundColor: '#CB202D' }
                    }}
                >
                    Sign Up
                </Button>
            </div>
        </Container>
    )
}
