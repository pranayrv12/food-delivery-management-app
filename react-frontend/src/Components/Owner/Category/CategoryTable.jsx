import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import CreateCategoryForm from './CreateCategoryForm'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Card, Modal, Table, TableRow, TableBody, TableCell, TableHead, CardHeader, IconButton, TableContainer } from '@mui/material'

const style = {
    top: '50%',
    width: 400,
    left: '50%',
    borderRadius: 2,
    outline: 'none',
    padding: '1.60rem',
    position: 'absolute',
    bgcolor: 'background.paper',
    transform: 'translate(-50%, -50%)'
}

export default function CategoryTable() {
    const { restaurant } = useSelector(store => store)

    const [openCategoryModal, setCategoryModal] = useState(false)

    const handleOpenCategoryModal = () => setCategoryModal(true)
    const handleCloseCategoryModal = () => setCategoryModal(false)

    return (
        <Box style={{ marginTop: '1.125rem', marginLeft: '0.625rem', marginRight: '1.25rem' }}>
            <Card sx={{ boxShadow: '0px 0px 16px #000000' }}>
                <CardHeader
                    title={'Menu Item Categories'}
                    sx={{ color: '#FFFFFF', textAlign: 'center', backgroundColor: '#CB202D' }}
                    action={
                        <IconButton
                            onClick={handleOpenCategoryModal}
                            sx={{
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#FFFFFF30' }
                            }}
                        >
                            <AddCircleOutlineIcon></AddCircleOutlineIcon>
                        </IconButton>
                    }>
                </CardHeader>
                <div style={{ height: '813.4px', overflowY: 'auto', overflowX: 'hidden' }}>
                    <TableContainer>
                        <Table aria-label='Category Table'>
                            <TableHead sx={{ backgroundColor: '#0D0D0D' }}>
                                <TableRow sx={{ height: '58px' }}>
                                    <TableCell sx={{ width: '42%', fontSize: '1rem', fontWeight: 'bold' }}>CATEGORY ID</TableCell>
                                    <TableCell sx={{ width: '58%', fontSize: '1rem', fontWeight: 'bold' }}>CATEGORY NAME</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {restaurant.categories.map((item, index) => (
                                    <TableRow
                                        hover
                                        key={index}
                                        sx={{
                                            height: '84px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: 'bold' }}>{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
            <Modal
                open={openCategoryModal}
                onClose={handleCloseCategoryModal}
                aria-labelledby='Create Category Form'
                sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(35, 44, 51, 0.65)' } }}
            >
                <Box sx={style}>
                    <CreateCategoryForm handleClose={handleCloseCategoryModal}></CreateCategoryForm>
                </Box>
            </Modal>
            <section>
                <BackdropComponent open={restaurant.loading}></BackdropComponent>
            </section>
        </Box>
    )
}
