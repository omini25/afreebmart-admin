import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % 5);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        centerMode: true,
        centerPadding: '60px',
        afterChange: (currentSlide) => setCurrentSlide(currentSlide),
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '20px',
                },
            },
        ],
    };

    return (
        <>
            <div className="relative">
                <Slider {...settings}>
                    {/* Box 1 */}
                    <div className="px-4">
                        <div className="bg-blue-200 rounded-lg p-4 md:p-6 flex items-center">
                            <div className="w-1/3 mr-4">
                                <img src="placeholder.jpg" alt="Placeholder" className="w-full"/>
                            </div>
                            <div className="w-2/3">
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Express Delivery</h3>
                                <p className="mb-4">With selected items</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-md">Save Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Box 2 */}
                    <div className="px-4">
                        <div className="bg-blue-200 rounded-lg p-4 md:p-6 flex items-center">
                            <div className="w-1/3 mr-4">
                                <img src="placeholder.jpg" alt="Placeholder" className="w-full"/>
                            </div>
                            <div className="w-2/3">
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Express Delivery</h3>
                                <p className="mb-4">With selected items</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-md">Save Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Box 3 */}
                    <div className="px-4">
                        <div className="bg-blue-200 rounded-lg p-4 md:p-6 flex items-center">
                            <div className="w-1/3 mr-4">
                                <img src="placeholder.jpg" alt="Placeholder" className="w-full"/>
                            </div>
                            <div className="w-2/3">
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Express Delivery</h3>
                                <p className="mb-4">With selected items</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-md">Save Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Box 4 */}
                    <div className="px-4">
                        <div className="bg-blue-200 rounded-lg p-4 md:p-6 flex items-center">
                            <div className="w-1/3 mr-4">
                                <img src="placeholder.jpg" alt="Placeholder" className="w-full"/>
                            </div>
                            <div className="w-2/3">
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Express Delivery</h3>
                                <p className="mb-4">With selected items</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-md">Save Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Box 5 */}
                    <div className="px-4">
                        <div className="bg-blue-200 rounded-lg p-4 md:p-6 flex items-center">
                            <div className="w-1/3 mr-4">
                                <img src="placeholder.jpg" alt="Placeholder" className="w-full"/>
                            </div>
                            <div className="w-2/3">
                                <h3 className="text-lg md:text-xl font-semibold mb-2">Express Delivery</h3>
                                <p className="mb-4">With selected items</p>
                                <button className="bg-white text-blue-600 px-4 py-2 rounded-md">Save Now</button>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

        </>
    )
}

export default Banner