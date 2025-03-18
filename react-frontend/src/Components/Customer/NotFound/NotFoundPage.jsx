import React from 'react'
import { Box, Card, Typography } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

export default function NotFoundPage() {
    return (
        <div style={{ height: '90vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <Card
                sx={{
                    width: '100%',
                    borderRadius: 2,
                    display: 'flex',
                    height: '300px',
                    maxWidth: '700px',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#191919',
                    boxShadow: '0px 0px 16px #000000'
                }}
            >
                <Box sx={{ gap: '0.80rem', display: 'flex', alignItems: 'center', marginTop: '-0.80rem', flexDirection: 'column' }}>
                    <WarningAmberIcon sx={{ color: '#FFBF00', fontSize: '4rem' }}></WarningAmberIcon>
                    <Typography variant='h4' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        404. That’s An Error.
                    </Typography>
                    <Typography variant='body1' sx={{ color: '#CB202D', textAlign: 'center', fontSize: '1.125rem', marginTop: '0.20rem' }}>
                        The requested URL was not found on this server. That’s all we know.
                    </Typography>
                </Box>
            </Card>
        </div>
    )
}
