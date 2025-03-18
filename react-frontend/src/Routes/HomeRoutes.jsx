import React from 'react'
import AdminRoutes from './AdminRoutes'
import CustomerRoutes from './CustomerRoutes'
import { Route, Routes } from 'react-router-dom'

export default function HomeRoutes() {

    return (
        <Routes>
            <Route
                path="/owner/restaurant/*"
                element={<AdminRoutes></AdminRoutes>}>
            </Route>
            <Route path="/*" element={<CustomerRoutes></CustomerRoutes>}></Route>
        </Routes>
    )
}
