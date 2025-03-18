import React from 'react'
import CustomerSideBar from './CustomerSideBar'
import { Route, Routes } from 'react-router-dom'
import AddressesPage from '../Address/AddressesPage'
import FavoritesPage from '../Profile/FavoritesPage'
import NotificationsPage from '../Profile/NotificationsPage'
import CustomerOrdersPage from '../Orders/CustomerOrdersPage'
import CustomerEventsPage from '../Profile/CustomerEventsPage'
import CustomerProfilePage from '../Profile/CustomerProfilePage'

export default function ProfilePage() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '20%', height: '80vh', position: 'sticky' }}>
                <CustomerSideBar></CustomerSideBar>
            </div>
            <div style={{ width: '80%' }}>
                <Routes>
                    <Route path="/addresses" element={<AddressesPage></AddressesPage>}></Route>
                    <Route path="/favorites" element={<FavoritesPage></FavoritesPage>}></Route>
                    <Route path="/" element={<CustomerProfilePage></CustomerProfilePage>}></Route>
                    <Route path="/events" element={<CustomerEventsPage></CustomerEventsPage>}></Route>
                    <Route path="/orders" element={<CustomerOrdersPage></CustomerOrdersPage>}></Route>
                    <Route path="/notifications" element={<NotificationsPage></NotificationsPage>}></Route>
                </Routes>
            </div>
        </div>
    )
}
