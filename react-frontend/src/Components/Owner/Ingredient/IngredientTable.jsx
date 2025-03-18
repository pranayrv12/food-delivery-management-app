import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateIngredientForm from './CreateIngredientForm'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CreateIngredientCategoryForm from './CreateIngredientCategoryForm'
import { updateIngredientAvailability } from '../../../Store/Ingredient/Action'
import { Box, Card, Grid, Modal, Table, Button, TableRow, TableBody, TableCell, TableHead, CardHeader, IconButton, TableContainer } from '@mui/material'

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

export default function IngredientTable() {
    const dispatch = useDispatch()

    const { ingredient } = useSelector(store => store)

    const [openCategoryModal, setCategoryModal] = useState(false)
    const handleOpenCategoryModal = () => setCategoryModal(true)
    const handleCloseCategoryModal = () => setCategoryModal(false)

    const handleUpdateIngredientAvailability = (ingredientId) => {
        dispatch(updateIngredientAvailability(ingredientId))
    }

    const [openIngredientModal, setIngredientModal] = useState(false)
    const handleOpenIngredientModal = () => setIngredientModal(true)
    const handleCloseIngredientModal = () => setIngredientModal(false)

    return (
        <Box style={{ marginTop: '1.125rem', marginLeft: '0.625rem', marginRight: '1.25rem' }}>
            <Grid container spacing={2}>
                <Grid item lg={7} xs={12}>
                    <Card sx={{ boxShadow: '0px 0px 16px #000000' }}>
                        <CardHeader
                            title={'Ingredients'}
                            action={
                                <IconButton
                                    onClick={handleOpenIngredientModal}
                                    sx={{
                                        transition: 'background-color 0.3s ease',
                                        '&:hover': { backgroundColor: '#FFFFFF30' }
                                    }}
                                >
                                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                                </IconButton>
                            }
                            sx={{ color: '#FFFFFF', textAlign: 'center', backgroundColor: '#CB202D' }}>
                        </CardHeader>
                        <div style={{ height: '813.4px', overflowY: 'auto', overflowX: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label='Ingredients Table'>
                                    <TableHead sx={{ backgroundColor: '#0D0D0D' }}>
                                        <TableRow sx={{ height: '58px' }}>
                                            <TableCell sx={{ width: '20%', fontSize: '1rem', fontWeight: 'bold' }}>INGREDIENT ID</TableCell>
                                            <TableCell sx={{ width: '30%', fontSize: '1rem', fontWeight: 'bold' }}>INGREDIENT NAME</TableCell>
                                            <TableCell sx={{ width: '25%', fontSize: '1rem', fontWeight: 'bold' }}>INGREDIENT CATEGORY</TableCell>
                                            <TableCell sx={{ width: '25%', fontSize: '1rem', fontWeight: 'bold' }}>AVAILABILITY</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ingredient.ingredients.map((item, index) => (
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
                                                <TableCell>{item.category.name}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant='contained'
                                                        onClick={() => handleUpdateIngredientAvailability(item.id)}
                                                        sx={{
                                                            color: '#FFFFFF',
                                                            fontWeight: 'bold',
                                                            borderColor: '#FFFFFF',
                                                            boxShadow: '0px 0px 12px #000000',
                                                            backgroundColor: item.available ? '#4CBB17' : '#CB202D',
                                                            transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
                                                            '&:hover': { boxShadow: '0px 0px 12px #000000', backgroundColor: item.available ? '#4CBB17' : '#CB202D' }
                                                        }}
                                                    >
                                                        {item.available ? 'Available' : 'Out Of Stock'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Card>
                </Grid>
                <Grid item lg={5} xs={12}>
                    <Card sx={{ boxShadow: '0px 0px 16px #000000' }}>
                        <CardHeader
                            title={'Ingredient Categories'}
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
                            }
                            sx={{ color: '#FFFFFF', textAlign: 'center', backgroundColor: '#CB202D' }}>
                        </CardHeader>
                        <div style={{ height: '813.4px', overflowY: 'auto', overflowX: 'hidden' }}>
                            <TableContainer>
                                <Table aria-label='Ingredient Category Table'>
                                    <TableHead sx={{ backgroundColor: '#0D0D0D' }}>
                                        <TableRow sx={{ height: '58px' }}>
                                            <TableCell sx={{ width: '42%', fontSize: '1rem', fontWeight: 'bold' }}>INGREDIENT CATEGORY ID</TableCell>
                                            <TableCell sx={{ width: '58%', fontSize: '1rem', fontWeight: 'bold' }}>INGREDIENT CATEGORY NAME</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ingredient.category.map((item, index) => (
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
                </Grid>
            </Grid>
            <Modal
                open={openIngredientModal}
                onClose={handleCloseIngredientModal}
                aria-labelledby='Create Ingredient Modal'
                sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(35, 44, 51, 0.65)' } }}
            >
                <Box sx={style}>
                    <CreateIngredientForm handleClose={handleCloseIngredientModal}></CreateIngredientForm>
                </Box>
            </Modal>
            <Modal
                open={openCategoryModal}
                onClose={handleCloseCategoryModal}
                aria-labelledby='Create Ingredient Category Modal'
                sx={{ '& .MuiBackdrop-root': { backgroundColor: 'rgba(35, 44, 51, 0.65)' } }}
            >
                <Box sx={style}>
                    <CreateIngredientCategoryForm handleClose={handleCloseCategoryModal}></CreateIngredientCategoryForm>
                </Box>
            </Modal>
            <section>
                <BackdropComponent open={ingredient.loading}></BackdropComponent>
            </section>
        </Box>
    )
}
