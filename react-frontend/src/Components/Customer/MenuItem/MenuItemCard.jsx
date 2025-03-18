import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMenuItemToCart } from '../../../Store/Cart/Action'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import { IngredientCategories } from '../../../Utils/IngredientCategories'
import { Button, Checkbox, Accordion, FormGroup, Typography, AccordionDetails, AccordionSummary, FormControlLabel } from '@mui/material'

export default function MenuItemCard({ item }) {
    const dispatch = useDispatch()

    const [expanded, setExpanded] = useState(false)
    const [selectedIngredients, setSelectedIngredients] = useState([])

    const handleToggleDetails = (event) => {
        event.stopPropagation()
        setExpanded((prev) => !prev)
    }
    const handleAddMenuItemToCart = (event) => {
        event.preventDefault()

        const menuItemData = {
            quantity: 1,
            menuItemId: item.id,
            ingredients: selectedIngredients
        }
        dispatch(addMenuItemToCart(menuItemData))
    }
    const handleCheckboxChange = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient))
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient])
        }
    }

    return (
        <Accordion expanded={expanded} sx={{ borderRadius: '8px', backgroundColor: '#191919', boxShadow: '0px 0px 16px #000000' }}>
            <AccordionSummary
                id='Menu Item Card'
                onClick={(event) => event.preventDefault()}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.50rem 1.15625rem',
                    justifyContent: 'space-between',
                    borderBottom: expanded ? '5px solid #FFFFFF4D' : 'none'
                }}
                expandIcon={<ExpandCircleDownIcon onClick={handleToggleDetails} style={{ color: '#FFFFFF', cursor: 'pointer', fontSize: '1.6rem' }}></ExpandCircleDownIcon>}
            >
                <div style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
                    <img
                        alt={item.name}
                        src={item.images[0]}
                        style={{
                            width: '7.20rem',
                            height: '7.20rem',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            marginLeft: '0.25rem',
                            boxShadow: '0px 0px 12px #000000'
                        }}>
                    </img>
                    <div style={{ gap: '1.25rem', display: 'flex', maxWidth: '42rem', flexDirection: 'column' }}>
                        <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: '1.20rem' }}>{item.name}</Typography>
                        <Typography variant='body1' sx={{ color: '#FFBF00', fontSize: '1.125rem' }}>₹{item.price}</Typography>
                        <Typography variant='body1' sx={{ color: '#4CBB17', fontSize: '1.125rem' }}>{item.description}</Typography>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#000000', padding: '1.25rem 1.25rem' }}>
                <form onSubmit={handleAddMenuItemToCart}>
                    <div style={{ gap: '1.25rem', display: 'flex', flexWrap: 'wrap' }}>
                        {Object.keys(IngredientCategories(item.ingredients)).map((category, index) => (
                            <div key={index} style={{ minWidth: '8.75rem' }}>
                                <Typography variant='body1' style={{ color: '#FFBF00', fontSize: '1.125rem', marginBottom: '0.50rem' }}>{category}</Typography>
                                <FormGroup>
                                    {IngredientCategories(item.ingredients)[category].map((ingredient, index) => (
                                        <FormControlLabel
                                            key={index}
                                            label={ingredient.name}
                                            control={
                                                <Checkbox
                                                    disabled={!ingredient.available}
                                                    onChange={() => handleCheckboxChange(ingredient.name)}
                                                    checked={selectedIngredients.includes(ingredient.name)}
                                                    sx={{ color: '#FFBF00', '&.Mui-checked': { color: '#FFBF00' } }}>
                                                </Checkbox>
                                            }>
                                        </FormControlLabel>
                                    ))}
                                </FormGroup>
                            </div>
                        ))}
                    </div>
                    <Button
                        type='submit'
                        variant='contained'
                        disabled={!item.available}
                        sx={{
                            color: '#000000',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            marginTop: '1.25rem',
                            backgroundColor: '#FFFFFF',
                            transition: 'background-color 0.3s ease',
                            '&:hover': { backgroundColor: '#4CBB17' }
                        }}
                    >
                        {item.available ? 'Add To Cart' : 'Out Of Stock'}
                    </Button>
                </form>
            </AccordionDetails>
        </Accordion>
    )
}
