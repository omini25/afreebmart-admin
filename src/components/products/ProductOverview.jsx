import {Fragment, useEffect, useState} from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import {server} from "../../server.js";
import {Link} from "react-router-dom";


export const ProductOverview = ({ product, onClose, open }) =>  {
    const [rating, setRating] = useState([]);
    const averageRating = rating.reduce((acc, review) => acc + review.rating, 0) / rating.length;
    const roundedAverageRating = Math.round(averageRating);

    useEffect(() => {
        axios.get(`${server}/review/${product.id}`)
            .then(response => {
                setRating(response.data.reviews);
                console.log('Rating: ', response.data.reviews);
            })
            .catch(error => console.error('Error:', error));
    }, [product]);

    console.log('Product Overview: ', product.id);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                        <div className="sm:col-span-4 lg:col-span-5">
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                                                <img src={`https://afreebmart.com/images/products/${product.image}`} alt={product.product_name} className="object-cover object-center" />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.product_name}</h2>

                                            <section aria-labelledby="information-heading" className="mt-3">
                                                <h3 id="information-heading" className="sr-only">
                                                    Product information
                                                </h3>

                                                <p className="text-2xl text-gray-900">$ {product.price}</p>

                                                {/* Reviews */}
                                                <div className="mt-3">
                                                    <h4 className="sr-only">Reviews</h4>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            {[0, 1, 2, 3, 4].map((ratingIndex) => (
                                                                <StarIcon
                                                                    key={ratingIndex}
                                                                    className={`
                                                                        ${ratingIndex < roundedAverageRating ? 'text-gold' : 'text-gray-50'},
                                                                        'h-5 w-5 flex-shrink-0'
                                                                    `}
                                                                    aria-hidden="true"
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="sr-only">{rating.length} reviews</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6">
                                                    <h4 className="sr-only">Description</h4>

                                                    <p className="text-sm text-gray-700">{product.description}</p>
                                                </div>
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-6">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>


                                                {/* Colors */}

                                                <div className="mt-6">
                                                    <button
                                                        type="submit"
                                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50"
                                                        >
                                                            Add to cart
                                                        </button>
                                                    </div>

                                                <p className="absolute left-4 top-4 text-center sm:static sm:mt-6">
                                                    <Link to={`/product/${product.product_name}`}
                                                          className="font-medium text-primary hover:text-secondary">
                                                        View full details
                                                    </Link>
                                                </p>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}