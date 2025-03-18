import React from 'react'
import { useState } from 'react'
import SearchCard from './SearchCard'
import FrequentSearches from './FrequentSearches'
import SearchIcon from '@mui/icons-material/Search'
import { FamousItems } from '../Carousel/FamousItems'
import { useDispatch, useSelector } from 'react-redux'
import { searchMenuItemsByNameOrCategory } from '../../../Store/MenuItem/Action'
import { Box, Grid, TextField, Typography, InputAdornment, CircularProgress } from '@mui/material'

export default function SearchPage() {
    const dispatch = useDispatch()

    const { menu } = useSelector(store => store)

    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchMenu = (query) => {
        setSearchQuery(query)

        if (query.trim()) {
            setIsLoading(true)
            dispatch(searchMenuItemsByNameOrCategory(query)).finally(() => {
                setIsLoading(false)
            })
        }
    }

    return (
        <Box sx={{ gap: '1.25rem', display: 'flex', alignItems: 'center', paddingTop: '2.50rem', flexDirection: 'column' }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Search Menu Items</Typography>
                <Typography variant='subtitle1' sx={{ color: '#FFFFFF4D', fontSize: '1.125rem', marginTop: '0.50rem' }}>Discover the Popular Cuisines Around You!</Typography>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: '58px',
                    display: 'flex',
                    maxWidth: '600px',
                    borderRadius: '28px',
                    alignItems: 'center',
                    backgroundColor: '#000000',
                    border: '2px solid #191919',
                    transition: 'border 0.3s ease',
                    '&:hover': {
                        border: '2px solid #FFFFFF'
                    },
                    '&:focus-within': {
                        border: '2px solid #CB202D'
                    },
                    boxShadow: '0px 0px 16px #191919'
                }}
            >
                <TextField
                    fullWidth
                    variant='standard'
                    value={searchQuery}
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon></SearchIcon>
                            </InputAdornment>
                        )
                    }}
                    onChange={(e) => handleSearchMenu(e.target.value)}
                    sx={{
                        marginLeft: '1.125rem',
                        '& .MuiInputBase-input': {
                            color: '#FFFFFF',
                            fontSize: '1.125rem',
                            padding: '0.625rem 0rem',
                        },
                        '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                            color: '#FFFFFF'
                        },
                        '&:focus-within .MuiInputAdornment-root .MuiSvgIcon-root': {
                            color: '#CB202D'
                        }
                    }}>
                </TextField>
            </Box>
            <Box sx={{ width: '80%', textAlign: 'center' }}>
                <Typography variant='h5' sx={{ color: '#FFFFFF', fontWeight: 'bold', paddingBottom: '1.60rem' }}>Popular Cuisines</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.875rem 1.875rem', justifyContent: 'center' }}>
                    {FamousItems.slice(0, 6).map((item, index) => (
                        <FrequentSearches key={index} image={item.image} title={item.title} onClick={() => handleSearchMenu(item.title)}></FrequentSearches>
                    ))}
                </Box>
            </Box>
            {searchQuery && (
                <Box sx={{ width: '68%' }}>
                    <Typography variant='h5' sx={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center', paddingTop: '0.20rem' }}>Search Results</Typography>
                    {isLoading ? (
                        <CircularProgress size={28} thickness={4} sx={{ color: '#FFFFFF' }}></CircularProgress>
                    ) : (menu.search.length === 0) ? (
                        <Typography sx={{ color: '#CB202D', textAlign: 'center', fontSize: '1.125rem', marginTop: '0.875rem' }}>
                            No Results Found. Try Searching For Another Menu Item!
                        </Typography>
                    ) : (
                        <Grid container spacing={3} sx={{ paddingTop: '1.25rem' }}>
                            {menu.search.map((item, index) => (
                                <Grid item sm={6} md={4} lg={4} xs={12} key={index}>
                                    <SearchCard item={item}></SearchCard>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>
            )}
        </Box>
    )
}
