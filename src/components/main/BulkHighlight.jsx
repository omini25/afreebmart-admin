import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {server} from "../../server.js";
import {Link} from "react-router-dom";

export const BulkHighlight = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`${server}/products`)
            .then(response => {
                const products = response.data.products;
                const groupOneProducts = products.filter(product => product.group === "1");
                const randomProduct = groupOneProducts[Math.floor(Math.random() * groupOneProducts.length)];
                setProduct(randomProduct);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }




    return (
        <>

            <div className=" md:py-12 lg:px-20 md:px-6 py-9 px-4">

                <div id="viewerBox" className="lg:p-10 md:p-6 p-4 bg-white dark:bg-gray-500">

                    <div
                        className="mt-3 md:mt-4 lg:mt-0 flex flex-col lg:flex-row items-strech justify-center lg:space-x-8">
                        <div
                            className="lg:w-1/2 flex justify-between items-strech bg-gray-50  px-2 py-20 md:py-6 md:px-6 lg:py-24">



                            <div >
                                <div className="slide-ana lg:relative">
                                    <div  style={{transform: "translateX(-100%)"}}>
                                        <img
                                            src={`https://afreebmart.com/images/products/${product.image}`}
                                            alt={product.product_name} className="w-full h-full"/>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className="lg:w-1/2 flex flex-col justify-center mt-7 md:mt-8 lg:mt-0 pb-8 lg:pb-0">
                            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">{product.product_name}</h1>
                            <p className="text-base leading-normal text-gray-600 dark:text-white mt-2">{product.description}</p>
                            <p className="text-3xl font-medium text-gray-600 dark:text-white mt-8 md:mt-10">${product.price}</p>
                            <div
                                className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16">
                                <button
                                    className="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
                                    Join or Create Group
                                </button>
                                <Link to={`/product/${product.product_name}`} className="w-full md:w-2/5 border border-gray-800 text-base font-medium leading-none text-gray-800 dark:text-white uppercase py-6 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-transparent dark:border-white dark:text-white focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800 ">
                                    <button>
                                        View Details
                                    </button>
                                </Link>
                            </div>
                            <div className="mt-6">
                                <button
                                    className="text-xl underline text-gray-800 dark:text-white dark:hover:text-gray-200 capitalize hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">add
                                    to wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}