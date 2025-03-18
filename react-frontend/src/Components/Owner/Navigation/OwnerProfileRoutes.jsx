import React from 'react'
import OwnerSidebar from './OwnerSidebar'
import { Route, Routes } from 'react-router-dom'
import CategoryTable from '../Category/CategoryTable'
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RestaurantMenu from '../MenuItem/RestaurantMenu'
import IngredientTable from '../Ingredient/IngredientTable'
import CreateMenuItemForm from '../MenuItem/CreateMenuItemForm'
import RestaurantEventsPage from '../Events/RestaurantEventsPage'
import RestaurantOrdersPage from '../Orders/RestaurantOrdersPage'
import RestaurantDashboard from '../Restaurant/RestaurantDashboard'
import CreateRestaurantForm from '../Restaurant/CreateRestaurantForm'
import { retrieveRestaurantOrders } from '../../../Store/Order/Action'
import RestaurantInformation from '../Restaurant/RestaurantInformation'
import { retrieveRestaurantCategories } from '../../../Store/Restaurant/Action'
import { retrieveRestaurantIngredients, retrieveRestaurantIngredientCategories } from '../../../Store/Ingredient/Action'

export default function OwnerProfileRoutes() {
    const dispatch = useDispatch()

    const [openSideBar, setSideBar] = useState(false)
    const handleCloseSideBar = () => setSideBar(false)

    const { restaurant } = useSelector(store => store)

    useEffect(() => {
        if (restaurant.usersRestaurant) {
            dispatch(retrieveRestaurantOrders(restaurant.usersRestaurant.id))
            dispatch(retrieveRestaurantCategories(restaurant.usersRestaurant.id))
            dispatch(retrieveRestaurantIngredients(restaurant.usersRestaurant.id))
            dispatch(retrieveRestaurantIngredientCategories(restaurant.usersRestaurant.id))
        }
    }, [dispatch, restaurant.usersRestaurant])

    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '20%', height: '80vh', position: 'sticky' }}>
                    <OwnerSidebar open={openSideBar} handleClose={handleCloseSideBar}></OwnerSidebar>
                </div>
                <div style={{ width: '80%' }}>
                    <Routes>
                        <Route path="/menu" element={<RestaurantMenu></RestaurantMenu>}></Route>
                        <Route path="/category" element={<CategoryTable></CategoryTable>}></Route>
                        <Route path="/" element={<RestaurantDashboard></RestaurantDashboard>}></Route>
                        <Route path="/ingredients" element={<IngredientTable></IngredientTable>}></Route>
                        <Route path="/add-menu" element={<CreateMenuItemForm></CreateMenuItemForm>}></Route>
                        <Route path="/event" element={<RestaurantEventsPage></RestaurantEventsPage>}></Route>
                        <Route path="/orders" element={<RestaurantOrdersPage></RestaurantOrdersPage>}></Route>
                        <Route path="/details" element={<RestaurantInformation></RestaurantInformation>}></Route>
                        <Route path="/add-restaurant" element={<CreateRestaurantForm></CreateRestaurantForm>}></Route>
                    </Routes>
                </div>
            </div>
        </Fragment>
    )
}
