import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CartPage from '../Components/Customer/Cart/CartPage'
import HomePage from '../Components/Customer/Home/HomePage'
import SearchPage from '../Components/Customer/Search/SearchPage'
import NotFoundPage from '../Components/Customer/NotFound/NotFoundPage'
import OrderSuccessPage from '../Components/Customer/Orders/OrderSuccessPage'
import RestaurantPage from '../Components/Customer/Restaurant/RestaurantPage'
import RestaurantForm from '../Components/Owner/Restaurant/CreateRestaurantForm'
import CustomerNavigationBar from '../Components/Customer/Navigation/CustomerNavigationBar'
import CustomerProfileRoutes from '../Components/Customer/Navigation/CustomerProfileRoutes'

export default function CustomerRoutes() {
    return (
        <div style={{ position: 'relative' }}>
            <nav style={{ top: '0', zIndex: 50, position: 'sticky' }}>
                <CustomerNavigationBar></CustomerNavigationBar>
            </nav>
            <Routes>
                <Route path='/cart' element={<CartPage></CartPage>}></Route>
                <Route exact path='/' element={<HomePage></HomePage>}></Route>
                <Route path='/search' element={<SearchPage></SearchPage>}></Route>
                <Route exact path='/*' element={<NotFoundPage></NotFoundPage>}></Route>
                <Route exact path='/account/:signup' element={<HomePage></HomePage>}></Route>
                <Route path='/payment/success/:id' element={<OrderSuccessPage></OrderSuccessPage>}></Route>
                <Route path='/owner/restaurant/create' element={<RestaurantForm></RestaurantForm>}></Route>
                <Route path='/my-profile/*' element={<CustomerProfileRoutes></CustomerProfileRoutes>}></Route>
                <Route exact path='/restaurant/:city/:title/:id' element={<RestaurantPage></RestaurantPage>}></Route>
            </Routes>
        </div>
    )
}
