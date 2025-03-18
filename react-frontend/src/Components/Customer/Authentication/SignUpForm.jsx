import React from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Field, Formik, ErrorMessage } from 'formik'
import { signUpUser } from '../../../Store/Authentication/Action'
import { Button, Select, MenuItem, Container, TextField, InputLabel, Typography, FormControl, CssBaseline } from '@mui/material'

const initialValues = {
    name: "",
    role: "",
    email: "",
    password: "",
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required!"),
    role: Yup.string().required("User Role is Required!"),
    email: Yup.string().email("Invalid Email ID Format!").required("Email ID is Required!"),
    password: Yup.string().required("Password is Required!").min(6, "Password must have at least 6 characters!")
})

export default function SignUpForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (signupData) => {
        dispatch(signUpUser(signupData, navigate))
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline></CssBaseline>
            <Typography variant='h5' sx={{ textAlign: 'center', paddingBottom: '1.20rem' }}>Create Your Account</Typography>
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
                            autoComplete='name'
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
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={
                                <ErrorMessage name='name'>
                                    {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                </ErrorMessage>
                            }>
                        </Field>
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
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={
                                <ErrorMessage name='password'>
                                    {message => <Typography variant='caption' sx={{ color: '#CB202D' }}>{message}</Typography>}
                                </ErrorMessage>
                            }>
                        </Field>
                        <FormControl
                            fullWidth
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            sx={{
                                marginBottom: '1.50rem',
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
                            <InputLabel id='role-label'>User Role</InputLabel>
                            <Field
                                id='role'
                                name='role'
                                as={Select}
                                label='User Role'
                                variant='outlined'
                                labelId='role-label'
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
                                <MenuItem value="ROLE_CUSTOMER" sx={{ paddingX: '0.80rem', paddingY: '0.70rem' }}>Customer</MenuItem>
                                <MenuItem value="ROLE_RESTAURANT_OWNER" sx={{ paddingX: '0.80rem', paddingY: '0.70rem' }}>Restaurant Owner</MenuItem>
                            </Field>
                            <ErrorMessage name='role'>
                                {message => <Typography variant='caption' style={{ color: '#CB202D', fontSize: '12px', paddingTop: '4px', paddingLeft: '16px' }}>{message}</Typography>}
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
                                backgroundColor: '#0D0D0D',
                                outline: '1px solid #FFFFFF',
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#CB202D' }
                            }}
                        >
                            Sign Up
                        </Button>
                    </Form>
                )}
            </Formik>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '1.80rem', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: '0.50rem' }}>Already have an account?</Typography>
                <Button
                    variant='contained'
                    onClick={() => navigate("/account/signin")}
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
                    Sign In
                </Button>
            </div>
        </Container>
    )
}
