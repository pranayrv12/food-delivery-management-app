import './App.css'
import { useEffect } from 'react'
import HomeRoutes from './Routes/HomeRoutes'
import darkTheme from './Components/Theme/DarkTheme'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveCartByUserId } from './Store/Cart/Action'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { retrieveUserProfile } from './Store/Authentication/Action'
import { retrieveAllRestaurants, retrieveRestaurantByUserId } from './Store/Restaurant/Action'

export default function App() {
    const dispatch = useDispatch()

    const jwt = localStorage.getItem('jwt')

    const { auth } = useSelector((store) => store)

    useEffect(() => {
        if (jwt) {
            dispatch(retrieveCartByUserId())
            dispatch(retrieveUserProfile(jwt))
            dispatch(retrieveAllRestaurants())
        }
    }, [jwt, dispatch])

    useEffect(() => {
        if (auth.user && auth.user.role === 'ROLE_RESTAURANT_OWNER') {
            dispatch(retrieveRestaurantByUserId())
        }
    }, [dispatch, auth.user])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline></CssBaseline>
            <HomeRoutes></HomeRoutes>
        </ThemeProvider>
    )
}
