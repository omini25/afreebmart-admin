import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {PhotoIcon} from "@heroicons/react/20/solid/index.js";
import axios from "axios";
import {server} from "../../server.js";
import {toast} from "react-toastify";


export function AddCategory({onClose}) {
    const [open, setOpen] = useState(true)
    const [category_name, setCategory_name] = useState('');
    const [sub_categories, setSub_categories] = useState('');
    const [category_icon, setCategory_icon] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('category_name', category_name);
        formData.append('sub_categories', sub_categories.split(',').map(sub => sub.trim()).join(','));
        formData.append('category_icon', document.querySelector('#category_icon').files[0]);

        try {
            const response = await axios.post(`${server}/admin/add-categories`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                // Handle successful response here
                toast('Category added successfully', {type: 'success'});
            } else {
                // Handle error here
                console.error('Error submitting form');
                toast('Error adding category', {type: 'error'})
            }
        } catch (error) {
            console.error('Error submitting form', error);
            toast('Error adding category', {type: 'error'})
        }
    }



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
                                    <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                                          onSubmit={handleSubmit}>
                                        <div className="flex-1">

                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between space-x-3">
                                                    <div className="space-y-1">
                                                        <Dialog.Title
                                                            className="text-base font-semibold leading-6 text-gray-900">
                                                            New Category
                                                        </Dialog.Title>
                                                        <p className="text-sm text-gray-500">
                                                            Add a category
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
                                                            htmlFor="category_name"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Category Name
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <input
                                                            type="text"
                                                            name="category_name"
                                                            id="category_name"
                                                            value={category_name}
                                                            onChange={(e) => setCategory_name(e.target.value)}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <div>
                                                        <label
                                                            htmlFor="sub_categories"
                                                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                                                        >
                                                            Sub Categories
                                                        </label>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <textarea
                                                            name="sub_categories"
                                                            id="sub_categories"
                                                            value={sub_categories}
                                                            onChange={(e) => setSub_categories(e.target.value)}
                                                            placeholder="Enter sub-categories separated by commas"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                    <label htmlFor="cover-photo"
                                                           className="block text-sm font-medium leading-6 text-gray-900">
                                                        Category Image
                                                    </label>
                                                    <div
                                                        className="mt-2  justify-center rounded-lg border border-dashed border-gray-900/25 sm:col-span-2">
                                                        <div className="text-center">
                                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300"
                                                                       aria-hidden="true"/>
                                                            <div
                                                                className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                <label
                                                                    htmlFor="category_icon"
                                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary"
                                                                >
                                                                    <span>Upload a file</span>
                                                                    <input id="category_icon" name="category_icon"
                                                                           type="file" className="sr-only"/>
                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG,
                                                                GIF up to 10MB</p>
                                                        </div>
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
                                                    className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                                >
                                                    Create Category
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

export default AddCategory;
