import React from 'react'
import { Fragment, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import EventCard from '../../Owner/Events/EventCard'
import { useDispatch, useSelector } from 'react-redux'
import EventBusyIcon from '@mui/icons-material/EventBusy'
import BackdropComponent from '../../Backdrop/BackdropComponent'
import { retrieveAllEvents } from '../../../Store/Restaurant/Action'

export default function CustomerEventsPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(retrieveAllEvents())
    }, [dispatch])

    const { restaurant } = useSelector(store => store)

    return (
        <Fragment>
            {restaurant.events.length > 0 ? (
                <div>
                    <Box className='py-10' sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Restaurant Events</Typography>
                        <Typography variant='subtitle1' sx={{ color: '#CB202D', fontSize: '1.25rem', marginTop: '0.625rem' }}>
                            Explore What’s Happening Near You!
                        </Typography>
                    </Box>
                    <div style={{ gap: '1.25rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {restaurant.events.map((item, index) => (
                            <EventCard item={item} key={index} isCustomer={true}></EventCard>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='space-y-5' style={{ textAlign: 'center' }}>
                        <EventBusyIcon sx={{ width: '14rem', height: '14rem', color: '#CB202D' }}></EventBusyIcon>
                        <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '1.90rem' }}>No Ongoing Events!</Typography>
                    </div>
                </div>
            )}
            <section>
                <BackdropComponent open={restaurant.loading}></BackdropComponent>
            </section>
        </Fragment>
    )
}
