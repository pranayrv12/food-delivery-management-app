import React from 'react'
import MenuItemTable from './MenuItemTable'

export default function RestaurantMenu() {
    return (
        <div style={{ marginTop: '1.125rem', marginLeft: '0.625rem', marginRight: '1.25rem' }}>
            <MenuItemTable name={'All Menu Items'}></MenuItemTable>
        </div>
    )
}
