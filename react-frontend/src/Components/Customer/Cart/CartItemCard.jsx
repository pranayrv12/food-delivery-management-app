import React from 'react'
import { useDispatch } from 'react-redux'
import { Chip, IconButton, Typography } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { deleteCartItemFromCart, updateCartItemQuantity } from '../../../Store/Cart/Action'

export default function CartItemCard({ item }) {
    const dispatch = useDispatch()

    const handleDeleteCartItemFromCart = () => {
        dispatch(deleteCartItemFromCart(item.id))
    }
    const handleUpdateCartItemQuantity = (value) => {
        if (value === -1 && item.quantity === 1) {
            handleDeleteCartItemFromCart()
        }
        const cartItemData = { cartItemId: item.id, quantity: item.quantity + value }
        dispatch(updateCartItemQuantity(cartItemData))
    }

    return (
        <div className='px-5'>
            <div className='space-x-5' style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    alt={item.menuItem.name}
                    src={item.menuItem.images[0]}
                    style={{ width: '5rem', height: '5rem', objectFit: 'cover', boxShadow: '0px 0px 12px #000000' }}>
                </img>
                <div style={{ width: '86%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ width: '100%', gap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ color: '#FFFFFF' }}>{item.menuItem.name}</Typography>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ gap: '0.25rem', display: 'flex', alignItems: 'center' }}>
                                <IconButton onClick={() => handleUpdateCartItemQuantity(-1)}>
                                    <RemoveCircleOutlineIcon sx={{ color: '#CB202D' }}></RemoveCircleOutlineIcon>
                                </IconButton>
                                <Typography variant='caption' sx={{ color: '#FFFFFF' }}>{item.quantity}</Typography>
                                <IconButton onClick={() => handleUpdateCartItemQuantity(1)}>
                                    <AddCircleOutlineIcon sx={{ color: '#CB202D' }}></AddCircleOutlineIcon>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <Typography variant='body1'>₹{item.totalAmount}</Typography>
                </div>
            </div>
            <div className='space-x-2' style={{ paddingTop: '0.75rem' }}>
                {item.ingredients.map((ingredient) => (
                    <Chip
                        label={ingredient}
                        sx={{
                            color: '#FFFFFF',
                            backgroundColor: '#0D0D0D',
                            border: '1px solid #FFFFFF',
                            boxShadow: '0px 0px 16px #000000'
                        }}>
                    </Chip>
                ))}
            </div>
        </div>
    )
}
