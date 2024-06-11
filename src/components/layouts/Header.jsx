import {Fragment, useEffect, useState} from 'react'
import {
    Dialog,
    DialogPanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    HeartIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon, UserIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'
import axios from "axios";
import {server} from "../../server.js";
import {useSelector} from "react-redux";
import {CartPreview} from "../CartPreview.jsx";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions.js';


export const Header = () => {
    const [categories, setCategories] = useState([]);
    const cartItems = useSelector((state) => state.cart.cart);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
        axios.get(`${server}/categories`)
            .then(response => {
                setCategories(response.data.categories);
                // console.log(categories.map(index => index));
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logout());

        // Clear the user from local storage
        localStorage.removeItem('user');
    };

    const navigation = {
        categories: [
            {
                id: 'women',
                name: 'Main Shop',
                featured: [
                    {
                        name: 'New Arrivals',
                        href: '#',
                        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                        imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                    },
                    {
                        name: 'Basic Tees',
                        href: '#',
                        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                        imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                    },
                ],
                sections: [
                    {
                        id: 'clothing',
                        name: 'Clothing',
                        items: [
                            { name: 'Tops', href: '#' },
                            { name: 'Dresses', href: '#' },
                            { name: 'Pants', href: '#' },
                            { name: 'Denim', href: '#' },
                            { name: 'Sweaters', href: '#' },
                            { name: 'T-Shirts', href: '#' },
                            { name: 'Jackets', href: '#' },
                            { name: 'Activewear', href: '#' },
                            { name: 'Browse All', href: '#' },
                        ],
                    },
                    {
                        id: 'accessories',
                        name: 'Accessories',
                        items: [
                            { name: 'Watches', href: '#' },
                            { name: 'Wallets', href: '#' },
                            { name: 'Bags', href: '#' },
                            { name: 'Sunglasses', href: '#' },
                            { name: 'Hats', href: '#' },
                            { name: 'Belts', href: '#' },
                        ],
                    },
                    {
                        id: 'brands',
                        name: 'Brands',
                        items: [
                            { name: 'Full Nelson', href: '#' },
                            { name: 'My Way', href: '#' },
                            { name: 'Re-Arranged', href: '#' },
                            { name: 'Counterfeit', href: '#' },
                            { name: 'Significant Other', href: '#' },
                        ],
                    },
                ],
            },
            {
                id: 'men',
                name: 'Bulk Shop',
                featured: [
                    {
                        name: 'New Arrivals',
                        href: '#',
                        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                        imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                    },
                    {
                        name: 'Artwork Tees',
                        href: '#',
                        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                        imageAlt:
                            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                    },
                ],
                sections: [
                    {
                        id: 'clothing',
                        name: 'About Bulks',
                        items: [
                            { name: 'Tops', href: '#' },
                            { name: 'Pants', href: '#' },
                            { name: 'Sweaters', href: '#' },
                            { name: 'T-Shirts', href: '#' },
                            { name: 'Jackets', href: '#' },
                            { name: 'Activewear', href: '#' },
                            { name: 'Browse All', href: '#' },
                        ],
                    },
                    {
                        id: 'accessories',
                        name: 'Groups',
                        items: [
                            { name: 'Watches', href: '#' },
                            { name: 'Wallets', href: '#' },
                            { name: 'Bags', href: '#' },
                            { name: 'Sunglasses', href: '#' },
                            { name: 'Hats', href: '#' },
                            { name: 'Belts', href: '#' },
                        ],
                    },
                    {
                        id: 'brands',
                        name: 'Brands',
                        items: [
                            { name: 'Re-Arranged', href: '#' },
                            { name: 'Counterfeit', href: '#' },
                            { name: 'Full Nelson', href: '#' },
                            { name: 'My Way', href: '#' },
                        ],
                    },
                ],
            },
        ],
        pages: [
            { name: 'Vendors', href: '#' },
            { name: 'Become a Vendor', href: '#' },
        ],
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [open, setOpen] = useState(false)


    return (
        <>

            <div className="bg-white">
                {/* Mobile menu */}
                <Transition show={open}>
                    <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
                        <TransitionChild
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </TransitionChild>

                        <div className="fixed inset-0 z-40 flex">
                            <TransitionChild
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <DialogPanel
                                    className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                    <div className="flex px-4 pb-2 pt-5">
                                        <button
                                            type="button"
                                            className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="absolute -inset-0.5"/>
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                    </div>

                                    {/* Links */}
                                    <TabGroup className="mt-2">
                                        {
                                            (() => {
                                                let elements = [];
                                                for (let i = 0; i < categories.length; i++) {
                                                    let category = categories[i];
                                                    elements.push(
                                                        <div key={category.category_name}>
                                                            <p id={`${category.category_name}-heading`}
                                                               className="font-medium text-primary">
                                                                {category.category_name}
                                                            </p>
                                                            <ul
                                                                role="list"
                                                                aria-labelledby={`${category.name}-heading`}
                                                                className="sm:mt-4 sm:space-y-4"
                                                            >
                                                                {
                                                                    category.sub_categories.split(',').map((subCategory, index) => (
                                                                        <li key={index}
                                                                            className="">
                                                                            <a href="#"
                                                                               className="hover:text-secondary">
                                                                                {subCategory}
                                                                            </a>
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    );
                                                }
                                                return elements;
                                            })()
                                        }
                                    </TabGroup>

                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                        {navigation.pages.map((page) => (
                                            <div key={page.name} className="flow-root">
                                                <a href={page.href}
                                                   className="-m-2 block p-2 font-medium text-gray-900">
                                                    {page.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                        <div className="flex">
                                            <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Account</span>
                                                <UserIcon className="h-6 w-6" aria-hidden="true"/>
                                            </a>
                                        </div>
                                    </div>


                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

                <header className={`fixed z-10 w-full bg-white shadow ${isCartPreviewOpen ? 'hidden' : ''}`}>
                    <p className="flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                        Get free delivery on orders over $100
                    </p>

                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                <button
                                    type="button"
                                    className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <a href="/">
                                        <span className="sr-only">Afreebmart</span>
                                        <img src="https://afreebmart.com/backend/images/logo/afreemart-logo.png"
                                             alt="Afreebmart Logo" style={{width: '240px', height: '50px'}}/>
                                    </a>
                                </div>

                                {/* Flyout menus */}
                                <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        {/* Fixed menus */}
                                        <Popover className="flex">
                                            <PopoverButton
                                                className='relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'>
                                                Main Shop
                                            </PopoverButton>
                                            <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                {/* Categories for Main Shop */}
                                                <div className="absolute inset-0 top-1/2 bg-white shadow"
                                                     aria-hidden="true">
                                                    <div className="relative bg-white">
                                                        <div className=" px-4">
                                                            <div className="py-8">
                                                                <div className="col-start-2 grid grid-cols-3 ">

                                                                    {
                                                                        (() => {
                                                                            let elements = [];
                                                                            for (let i = 0; i < categories.length; i++) {
                                                                                let category = categories[i];
                                                                                elements.push(
                                                                                    <div key={category.category_name}>
                                                                                        <p id={`${category.category_name}-heading`}
                                                                                           className="font-medium text-primary">
                                                                                            {category.category_name}
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${category.name}-heading`}
                                                                                            className="sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {
                                                                                                category.sub_categories.split(',').map((subCategory, index) => (
                                                                                                    <li key={index}
                                                                                                        className="">
                                                                                                        <a href="#"
                                                                                                           className="hover:text-secondary">
                                                                                                            {subCategory}
                                                                                                        </a>
                                                                                                    </li>
                                                                                                ))
                                                                                            }
                                                                                        </ul>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return elements;
                                                                        })()
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverPanel>
                                        </Popover>

                                        <Popover className="flex">
                                            <PopoverButton
                                                className='relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'>
                                                Bulk Shop
                                            </PopoverButton>
                                            <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                {/* Categories for Bulk Shop */}
                                                <div className="absolute inset-0 top-1/2 bg-white shadow"
                                                     aria-hidden="true">
                                                    <div className="relative bg-white">
                                                        <div className=" px-4">
                                                            <div className="py-8">
                                                                <div className="col-start-2 grid grid-cols-3 ">

                                                                    {
                                                                        (() => {
                                                                            let elements = [];
                                                                            for (let i = 0; i < categories.length; i++) {
                                                                                let category = categories[i];
                                                                                elements.push(
                                                                                    <div key={category.category_name}>
                                                                                        <p id={`${category.category_name}-heading`}
                                                                                           className="font-medium text-primary">
                                                                                            {category.category_name}
                                                                                        </p>
                                                                                        <ul
                                                                                            role="list"
                                                                                            aria-labelledby={`${category.name}-heading`}
                                                                                            className="sm:mt-4 sm:space-y-4"
                                                                                        >
                                                                                            {
                                                                                                category.sub_categories.split(',').map((subCategory, index) => (
                                                                                                    <li key={index}
                                                                                                        className="">
                                                                                                        <a href="#"
                                                                                                           className="hover:text-secondary">
                                                                                                            {subCategory}
                                                                                                        </a>
                                                                                                    </li>
                                                                                                ))
                                                                                            }
                                                                                        </ul>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                            return elements;
                                                                        })()
                                                                    }

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverPanel>
                                        </Popover>
                                    </div>
                                </PopoverGroup>

                                <div className="ml-auto flex items-center">

                                    {/* Search */}
                                    <div className="flex lg:ml-6">
                                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true"/>
                                        </a>
                                    </div>

                                    {/* Products */}
                                    <div className="relative ml-4 flow-root lg:ml-6">
                                        <a href="#" className="group -m-2 flex items-center p-2">
                                            <HeartIcon
                                                className="h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <div
                                                className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs px-1 rounded-full">
                                                <span>0</span>
                                                <span className="sr-only">items in wishlist, view wishlist</span>
                                            </div>
                                        </a>
                                    </div>

                                    {/* Cart */}
                                    <div className="relative ml-4 flow-root lg:ml-6">
                                        <button onClick={() => setIsCartOpen(!isCartOpen)}
                                                className="group -m-2 flex items-center p-2">
                                            <ShoppingCartIcon
                                                className="h-7 w-7 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <div
                                                className="absolute top-0 right-0 inline-block bg-red-500 text-white text-xs px-1 rounded-full">
                                                <span>{cartItems.length}</span>
                                                <span className="sr-only">items in cart, view cart</span>
                                            </div>
                                        </button>
                                        {isCartOpen && <CartPreview setIsCartPreviewOpen={setIsCartPreviewOpen}/>}
                                    </div>

                                    {/* Account */}
                                    <Popover className="relative text-left ml-4 flow-root lg:ml-6">
                                        <Popover.Button className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Account</span>
                                            {user.isLoggedIn ? (
                                                <img src={`https://afreebmart.com/${user.user.image}`} alt="User"
                                                     className="h-7 w-7 rounded-full"/>
                                            ) : (
                                                <UserIcon className="h-7 w-7" aria-hidden="true" />
                                            )}
                                        </Popover.Button>
                                        <Popover.Panel className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                {user.isLoggedIn ? (
                                                    <>
                                                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">{user.user.name}</p>
                                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Account</a>
                                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Orders</a>
                                                        <a onClick={handleLogout}
                                                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                           role="menuitem">Log out
                                                        </a>
                                                    </>
                                                ) : (
                                                    <>
                                                        <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Log in</a>
                                                        <a href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign up</a>
                                                    </>
                                                )}
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>

        </>
    )
}