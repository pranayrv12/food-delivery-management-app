import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrderStatus } from '../../../Store/Order/Action'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import SnackbarComponent from '../../Snackbar/SnackbarComponent'
import { Box, Card, Chip, Menu, Table, Avatar, Button, MenuItem, TableRow, TableBody, TableCell, TableHead, CardHeader, Typography, AvatarGroup, TableContainer } from '@mui/material'

const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" }
]

export default function OrderTable({ isDashboard, name }) {
    const dispatch = useDispatch()

    const { order } = useSelector(store => store)

    const [anchorEl, setAnchorEl] = useState(null)
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [currentOrderId, setCurrentOrderId] = useState(null)

    const handleSnackBar = () => setOpenSnackBar(false)

    const handleCloseMenu = () => {
        setAnchorEl(null)
        setCurrentOrderId(null)
    }
    const handleOpenMenu = (event, orderId) => {
        setAnchorEl(event.currentTarget)
        setCurrentOrderId(orderId)
    }
    const handleUpdateOrderStatus = (orderId, orderStatus) => {
        handleCloseMenu()
        dispatch(updateOrderStatus(orderId, orderStatus))
        setOpenSnackBar(true)
    }
    const orders = isDashboard ? [...(order.orders || [])].reverse().slice(0, 8) : order.orders || []

    return (
        <Box width={'100%'}>
            <Card sx={{ boxShadow: '0px 0px 16px #000000' }}>
                <CardHeader
                    title={name}
                    sx={{ color: '#FFFFFF', textAlign: 'center', backgroundColor: '#CB202D' }}>
                </CardHeader>
                <div style={{ height: '813.4px', overflowY: 'auto', overflowX: 'hidden' }}>
                    <TableContainer>
                        <Table aria-label='Order Table'>
                            <TableHead sx={{ backgroundColor: '#0D0D0D' }}>
                                <TableRow sx={{ height: '58px' }}>
                                    {!isDashboard && (
                                        <TableCell sx={{ width: '8%', fontSize: '1rem', fontWeight: 'bold' }}>ORDER ID</TableCell>
                                    )}
                                    <TableCell sx={{ width: '8%', fontSize: '1rem', fontWeight: 'bold' }}>IMAGE</TableCell>
                                    <TableCell sx={{ width: '14%', fontSize: '1rem', fontWeight: 'bold' }}>MENU ITEM</TableCell>
                                    {!isDashboard && (
                                        <TableCell sx={{ width: '16%', fontSize: '1rem', fontWeight: 'bold' }}>INGREDIENTS</TableCell>
                                    )}
                                    <TableCell sx={{ width: '10%', fontSize: '1rem', fontWeight: 'bold' }}>EARNINGS</TableCell>
                                    <TableCell sx={{ width: '14%', fontSize: '1rem', fontWeight: 'bold' }}>CUSTOMER EMAIL</TableCell>
                                    {!isDashboard && (
                                        <TableCell sx={{ width: '14%', fontSize: '1rem', fontWeight: 'bold' }}>ORDER STATUS</TableCell>
                                    )}
                                    {!isDashboard && (
                                        <TableCell sx={{ width: '16%', fontSize: '1rem', textAlign: 'center', fontWeight: 'bold' }}>UPDATE ORDER STATUS</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((item, index) => (
                                    <TableRow
                                        hover
                                        key={index}
                                        sx={{
                                            height: '84px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                    >
                                        {!isDashboard && (
                                            <TableCell sx={{ fontWeight: 'bold' }}>{item.id}</TableCell>
                                        )}
                                        <TableCell>
                                            <AvatarGroup max={4} sx={{ justifyContent: 'start' }}>
                                                {item.items.map((orderItem, index) => (
                                                    <Avatar
                                                        key={index}
                                                        alt={orderItem.menuItem.name}
                                                        src={orderItem.menuItem.images[0]}
                                                        sx={{ boxShadow: '0px 0px 12px #000000' }}>
                                                    </Avatar>
                                                ))}
                                            </AvatarGroup>
                                        </TableCell>
                                        <TableCell>
                                            {item.items.map((orderItem, index) => (
                                                <Typography variant='body2' key={index}>{orderItem.menuItem.name}</Typography>
                                            ))}
                                        </TableCell>
                                        {!isDashboard && (
                                            <TableCell className='space-y-2'>
                                                {item.items.map((orderItem, index) =>
                                                    <div key={index} style={{ gap: '0.25rem', display: 'flex', flexWrap: 'wrap' }}>
                                                        {orderItem.ingredients.map((ingredient, index) => (
                                                            <Chip
                                                                key={index}
                                                                label={ingredient}
                                                                sx={{
                                                                    color: '#FFFFFF',
                                                                    backgroundColor: '#0D0D0D',
                                                                    border: '1px solid #FFFFFF',
                                                                    boxShadow: '0px 0px 12px #000000'
                                                                }}>
                                                            </Chip>
                                                        ))}
                                                    </div>
                                                )}
                                            </TableCell>
                                        )}
                                        <TableCell>₹{item.totalAmount + 21 + 5 + (item.totalAmount * 0.18)}</TableCell>
                                        <TableCell>{item.customer.email}</TableCell>
                                        {!isDashboard && (
                                            <TableCell>
                                                <Chip
                                                    size='large'
                                                    label={item.orderStatus}
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        textAlign: 'center',
                                                        boxShadow: '0px 0px 12px #000000',
                                                        bgcolor: item.orderStatus === "PENDING" ? '#CB202D' : item.orderStatus === "DELIVERED" ? '#4CBB17' : '#FFBF00'
                                                    }}>
                                                </Chip>
                                            </TableCell>
                                        )}
                                        {!isDashboard && (
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Button
                                                    variant='contained'
                                                    aria-haspopup='true'
                                                    id={`basic-button-${item.id}`}
                                                    aria-controls={`basic-menu-${item.id}`}
                                                    onClick={(event) => handleOpenMenu(event, item.id)}
                                                    aria-expanded={Boolean(anchorEl && item.id === currentOrderId)}
                                                    sx={{
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold',
                                                        marginLeft: '1rem',
                                                        borderColor: '#FFFFFF',
                                                        backgroundColor: '#0D0D0D',
                                                        outline: '1px solid #FFFFFF',
                                                        boxShadow: '0px 0px 12px #000000',
                                                        transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                                                        '&:hover': { backgroundColor: '#CB202D', boxShadow: '0px 0px 12px #000000' }
                                                    }}
                                                >
                                                    Status
                                                </Button>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    disableAutoFocusItem
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right'
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                    onClose={handleCloseMenu}
                                                    id={`basic-menu-${item.id}`}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button'
                                                    }}
                                                    sx={{
                                                        '& .MuiMenu-list': {
                                                            backgroundColor: '#0D0D0D'
                                                        },
                                                        '& .MuiMenu-paper': {
                                                            color: '#FFFFFF',
                                                            minWidth: '270px',
                                                            borderRadius: '8px',
                                                            marginTop: '0.3rem',
                                                            marginLeft: '0.1rem',
                                                            boxShadow: '0px 0px 10px #191919'
                                                        }
                                                    }}
                                                    open={Boolean(anchorEl && item.id === currentOrderId)}
                                                >
                                                    {orderStatus.map((status, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            sx={{
                                                                color: '#FFFFFF',
                                                                fontWeight: 'bold',
                                                                fontSize: '0.96rem',
                                                                paddingX: '0.80rem',
                                                                paddingY: '0.70rem',
                                                                transition: 'background-color 0.3s ease',
                                                                '&:hover': { backgroundColor: '#FFFFFF16' }
                                                            }}
                                                            onClick={() => handleUpdateOrderStatus(item.id, status.value)}
                                                        >
                                                            {status.label}
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </TableCell>)}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
            <section>
                <BackdropComponent open={order.loading}></BackdropComponent>
            </section>
            <section>
                <SnackbarComponent open={openSnackBar} severity={'success'} handleClose={handleSnackBar} message={'Order Status Updated Successfully!'}></SnackbarComponent>
            </section>
        </Box>
    )
}
