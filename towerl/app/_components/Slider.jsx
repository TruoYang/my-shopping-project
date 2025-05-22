import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

function Slider({sliderList}) {

    return (
        <div>
            <Carousel>
                <CarouselContent>
                    {sliderList.map((slider, index) => (
                        <CarouselItem key = {index}>
                            <Image
                                src = {process.env.NEXT_PUBLIC_BACKEND_URL + slider?.image?.[0]?.url}
                                alt = "Slider"
                                width = {1000}
                                height = {400}
                                className = 'w-full h-full max-h-[300px] object-cover rounded-2xl'

                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default Slider