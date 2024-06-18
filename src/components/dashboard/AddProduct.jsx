import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {PhotoIcon} from "@heroicons/react/20/solid/index.js";
import {server} from "../../server.js";
import axios from "axios";
import {toast} from "react-toastify";


export function AddProduct({onClose}) {
    const [open, setOpen] = useState(true)
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        for (const pair of new FormData(event.target)) {
            formData.append(pair[0], pair[1]);
        }
        formData.append('image', file);

        try {
            const response = await axios.post(`${server}/admin/products`, formData);
            console.log(response.data);
            toast('Product added successfully', {type: 'success', autoClose: 2000});

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Failed to submit form:', error);
            // handle error
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${server}/admin/categories`);

                setCategories(response.data.flat());
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (event) => {
        const selectedCategory = categories.find(category => category.category_name === event.target.value);
        if (selectedCategory) {
            // Split the sub_categories string into an array
            const subCategoriesArray = selectedCategory.sub_categories.split(',');
            setSubCategories(subCategoriesArray);
        } else {
            setSubCategories([]);
        }
    };



    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <form onSubmit={handleSubmit} className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1">

                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                            New Product
                                                        </Dialog.Title>
                                                        <p className="text-sm text-gray-500">
                                                            Add a new product
                                                        </p>
                                                    </div>
                                                    <div className="flex h-7 items-center">

                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                            onClick={onClose}
                                                        >
                                                            Close
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Divider container */}
                                            <div
                                                className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="product_name"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Product name
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="product_name"
                                                            id="product_name"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="category"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Category
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <select
                                                            id="category"
                                                            name="category"
                                                            autoComplete="category"
                                                            onChange={handleCategoryChange}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        >
                                                            <option>Select a category</option>
                                                            {categories.map(category => (
                                                                <option key={category.id}
                                                                        value={category.category_name}>
                                                                    {category.category_name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="project-name"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Sub-Category
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <select
                                                            id="sub-category"
                                                            name="sub_category"
                                                            autoComplete="sub-category"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        >
                                                            {subCategories.map((subCategory, index) => (
                                                                <option key={index} value={subCategory}>
                                                                    {subCategory}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="unit"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Unit
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <select
                                                            name="unit"
                                                            id="unit"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        >
                                                            <option value={`KG`}>KG</option>
                                                            <option value={`Litre`}>Litre</option>
                                                            <option value={`Gram`}>Gram</option>
                                                            <option value={`Millilitre`}>Millilitre</option>
                                                            <option value={`Piece`}>Piece</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="tag"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Tags
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="tags"
                                                            id="tag"

                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="Bulk Product"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Bulk Product
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <select
                                                            id="bulk-product"
                                                            name="group"
                                                            autoComplete="bulk-product"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        >
                                                            <option value={0}>No</option>
                                                            <option value={1}>Yes</option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="description"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Description
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <textarea
                                                            id="description"
                                                            name="description"
                                                            rows={3}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            defaultValue={''}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label htmlFor="image"
                                                           className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-primary">
                                                        <span>Upload a file</span>
                                                        <input id="image" name="image" type="file" accept="image/*"
                                                               className="sr-only"
                                                               onChange={handleFileChange}/>
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>


                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="shipping_weight"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Weight (KG)
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="shipping_weight"
                                                            id="shipping_weight"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="price"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Product Price
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            id="price"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="group_price"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Bulk Price
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="number"
                                                            name="group_price"
                                                            id="group_price"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="quantity"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Quantity
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            id="quantity"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="vendor_id"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Vendor ID
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="number"
                                                            name="vendor_id"
                                                            id="vendor_id"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                    onClick={onClose} // Call the onClose prop function when the button is clicked
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    Create Product
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AddProduct;
