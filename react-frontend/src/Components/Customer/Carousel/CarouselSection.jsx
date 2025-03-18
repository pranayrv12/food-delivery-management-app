import React from 'react'
import { Fragment } from 'react'
import Slider from 'react-slick'
import { Component } from 'react'
import 'slick-carousel/slick/slick.css'
import CarouselItem from './CarouselItem'
import { FamousItems } from './FamousItems'
import 'slick-carousel/slick/slick-theme.css'

const responsive = [
    {
        breakpoint: 1024,
        settings: { slidesToShow: 5 }
    },
    {
        breakpoint: 900,
        settings: { slidesToShow: 3 }
    },
    {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
    },
    {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
    }
]

export default class CarouselSection extends Component {
    render() {
        const settings = {
            dots: true,
            responsive,
            speed: 1020,
            arrows: false,
            autoplay: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            pauseOnHover: true,
            autoplaySpeed: 4000
        }

        return (
            <Fragment>
                <style>
                    {`
                        .slick-dots li button:before {
                            color: #FFFFFF4D;
                        }
                        .slick-dots li.slick-active button:before {
                            color: #FFFFFF;
                        }
                    `}
                </style>
                <Slider {...settings}>
                    {FamousItems.map((item, index) => <CarouselItem key={index} image={item.image} title={item.title} description={item.description}></CarouselItem>)}
                </Slider>
            </Fragment>
        )
    }
}
