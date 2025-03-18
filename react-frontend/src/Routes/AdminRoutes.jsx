import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import OwnerProfileRoutes from '../Components/Owner/Navigation/OwnerProfileRoutes'
import CreateRestaurantForm from '../Components/Owner/Restaurant/CreateRestaurantForm'

export default function AdminRoutes() {
    const { restaurant } = useSelector(store => store)

    return (
        <Fragment>
            <Routes>
                <Route
                    path="/*"
                    element={restaurant.usersRestaurant ? (<OwnerProfileRoutes></OwnerProfileRoutes>) : (<CreateRestaurantForm></CreateRestaurantForm>)}>
                </Route>
            </Routes>
        </Fragment>
    )
}
