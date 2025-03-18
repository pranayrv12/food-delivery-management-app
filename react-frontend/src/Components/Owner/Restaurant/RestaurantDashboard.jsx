import React from 'react'
import { Grid } from '@mui/material'
import OrderTable from '../Orders/OrderTable'
import MenuItemTable from '../MenuItem/MenuItemTable'

export default function RestaurantDashboard() {
    return (
        <div style={{ marginTop: '1.125rem', marginLeft: '0.625rem', marginRight: '1.25rem' }}>
            <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                    <OrderTable isDashboard={true} name={'Recent Orders'}></OrderTable>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <MenuItemTable isDashboard={true} name={'Recently Added Menu Items'}></MenuItemTable>
                </Grid>
            </Grid>
        </div>
    )
}
