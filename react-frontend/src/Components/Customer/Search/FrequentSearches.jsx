import React from 'react'
import { useState } from 'react'

export default function FrequentSearches({ image, title, onClick }) {
    const [filter, setFilter] = useState('brightness(1)')

    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                paddingLeft: '1.25rem',
                paddingRight: '1.25rem',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <img
                src={image}
                alt={title}
                style={{
                    filter: filter,
                    width: '11.30rem',
                    height: '11.30rem',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    objectPosition: 'center',
                    transition: 'filter 0.3s ease',
                    boxShadow: '0px 0px 16px #000000'
                }}
                onMouseUp={() => setFilter('brightness(1)')}
                onMouseLeave={() => setFilter('brightness(1)')}
                onMouseDown={() => setFilter('brightness(1.5)')}
                onMouseEnter={() => setFilter('brightness(1.2)')}>
            </img>
            <span style={{ color: '#FFFFFF', fontSize: '1.1rem', paddingTop: '0.50rem' }}>{title}</span>
        </div>
    )
}
