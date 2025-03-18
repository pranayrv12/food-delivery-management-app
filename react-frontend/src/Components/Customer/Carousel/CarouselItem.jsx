import React from 'react'
import { useState } from 'react'
import { Typography } from '@mui/material'

export default function CarouselItem({ image, title, description }) {
    const [filter, setFilter] = useState('brightness(1)')

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '0.50rem', justifyContent: 'center' }}>
            <img
                alt={title}
                src={image}
                style={{
                    filter: filter,
                    width: '23rem',
                    height: '13.8rem',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderTopLeftRadius: '0.50rem',
                    transition: 'filter 0.3s ease',
                    borderTopRightRadius: '0.50rem'
                }}
                onMouseLeave={() => setFilter('brightness(1)')}
                onMouseEnter={() => setFilter('brightness(1.25)')}>
            </img>
            <div
                style={{
                    width: '23rem',
                    textAlign: 'center',
                    paddingTop: '0.50rem',
                    paddingLeft: '0.75rem',
                    paddingRight: '0.75rem',
                    paddingBottom: '0.75rem',
                    backgroundColor: '#191919',
                    borderBottomLeftRadius: '0.50rem',
                    borderBottomRightRadius: '0.50rem'
                }}
            >
                <Typography variant='body1' sx={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '0.25rem' }}>{title}</Typography>
                <Typography variant='body1' sx={{ color: '#CB202D', fontSize: '1rem', fontStyle: 'italic' }}>{description}</Typography>
            </div>
        </div>
    )
}
