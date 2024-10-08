import React from 'react';
import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    FolderIcon,
    GlobeAltIcon,
    XMarkIcon,
    Bars3Icon,
    BuildingStorefrontIcon,
    IdentificationIcon,
    InboxStackIcon,
    MagnifyingGlassIcon,
    TagIcon,
    UserCircleIcon,
    UserGroupIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    TruckIcon,
    WalletIcon,
    ArrowRightStartOnRectangleIcon,
    ListBulletIcon,
    StarIcon,
    BackspaceIcon,
} from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';
import {server} from "../../server.js";
import axios from "axios";
import {assetServer} from "../../../assetServer.js";
import banknotesIcon from "@heroicons/react/16/solid/esm/BanknotesIcon.js";
import {useNavigate} from "react-router-dom";
import { PaperClipIcon } from '@heroicons/react/20/solid'




import logo from '../../assets/afreemart-logo.png'
const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: true },
    { name: 'Orders', href: '/orders', icon: ShoppingCartIcon, current: false },
    { name: 'Products', href: '/products', icon: ShoppingBagIcon, current: false },
    { name: 'Categories', href: '/categories', icon: ListBulletIcon, current: false },
    { name: 'Ads', href: '/ads', icon: GlobeAltIcon, current: false },
    { name: 'Deliveries', href: '/deliveries', icon: TruckIcon, current: false },
    { name: 'Payment History', href: '/payments', icon: banknotesIcon, current: false },
    { name: 'Payment Request', href: '/payments-requests', icon: WalletIcon, current: false },
    { name: 'Messages', href: '/messages', icon: InboxStackIcon, current: false },
    { name: 'Users', href: '/users', icon: UserGroupIcon, current: false },
    { name: 'Vendors', href: '/vendors', icon: BuildingStorefrontIcon, current: false },
    { name: 'Deliverers', href: '/deliverers', icon: BackspaceIcon, current: false },
    // { name: 'Admins', href: '/admins', icon: IdentificationIcon, current: false },
    { name: 'Coupons', href: '/coupons', icon: TagIcon, current: false },
    { name: 'Reviews', href: '/reviews', icon: StarIcon, current:false},
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}






export const Dashboard = () => {
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;
    const [userCount, setUserCount] = useState(0);
    const pendingOrdersCount = orders.filter(order => order.status === 'pending').length;
    const [totalRevenue, setTotalRevenue] = useState(0);
    const navigate = useNavigate();
    const [activityItems, setActivityItems] = useState([]);



    useEffect(() => {
        const totalRevenue = async () => {
            try {
                const response = await axios.get(`${server}/admin/orders`);
                // Flatten the array structure
                const totalRevenue = response.data.total_price;
                setTotalRevenue(totalRevenue);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        totalRevenue();
    }, []);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${server}/admin/users`);
                setUserCount(response.data.flat().length);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${server}/admin/orders`);
                // Flatten the array structure
                const flattenedOrders = response.data.orders.flat();
                setOrders(flattenedOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${server}/admin/products`);
                setProducts(response.data.flat());
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchActivityItems = async () => {
            try {
                // Replace with your own API endpoint
                const response = await axios.get(`${server}/admin/actions/details`);
                setActivityItems(response.data.flatMap(item => item.orders, item => item.payments, item => item.reviews, item => item.groups, item => item.ads, item => item.products));
            } catch (error) {
                console.error('Failed to fetch activity items:', error);
            }
        };

        fetchActivityItems();
    }, []);


    console.log(activityItems);

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div
                                        className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 ring-1 ring-white/10">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <a href="/dashboard">
                                                <img
                                                    className="h-8 w-auto"
                                                    src={logo}
                                                    alt="Afreebmart Admin"
                                                />
                                            </a>
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <a
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-primary text-white'
                                                                            : 'text-gray-400 hover:text-white hover:bg-secondary',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon className="h-6 w-6 shrink-0"
                                                                               aria-hidden="true"/>
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li key="Log out">
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(logout());
                                                            navigate('/'); // dispatch the logout action when the link is clicked
                                                        }}
                                                        className={classNames(
                                                            'text-gray-400 hover:bg-red-800 hover:secondary',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}
                                                    >
                                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 shrink-0"
                                                                                        aria-hidden="true"/>
                                                        Log out
                                                    </a>
                                                </li>

                                                <li className="-mx-6 mt-auto">
                                                    <a
                                                        href="/profile"
                                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:bg-secondary"
                                                    >
                                                        <img
                                                            className="h-8 w-8 rounded-full bg-gray-800"
                                                            src={user && user.user && user.user.image ? `${assetServer}/images/users/${user.user.image}` : 'defaultImageURL'}
                                                            alt=""
                                                        />
                                                        <span className="sr-only">Your profile</span>
                                                        <span aria-hidden="true">{user && user.user ? user.user.name : 'Default Name'}</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 ring-1 ring-white/5 border border-primary">
                        <div className="flex h-16 shrink-0 items-center">
                            <a href="/dashboard">
                                <img
                                    className="h-8 w-auto"
                                    src={logo}
                                    alt="Afreebmart Admin"
                                />
                            </a>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-primary text-white'
                                                            : 'text-gray-400 hover:text-white hover:bg-secondary',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li key="Log out">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(logout());
                                            navigate('/');
                                        }}
                                        className={classNames(
                                            'text-gray-400 hover:bg-red-800 hover:secondary',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <ArrowRightStartOnRectangleIcon className="h-6 w-6 shrink-0"
                                                                        aria-hidden="true"/>
                                        Log out
                                    </a>
                                </li>

                                <li className="-mx-6 mt-auto">
                                    <a
                                        href="/profile"
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:secondary"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-800"
                                            src={user && user.user && user.user.image ? `${assetServer}/images/users/${user.user.image}` : 'defaultImageURL'}
                                            alt=""
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <span aria-hidden="true">{user && user.user ? user.user.name : 'Default Name'}</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="xl:pl-72">
                    {/* Sticky search header */}
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
                        <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden"
                                onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-5 w-5 text-primary" aria-hidden="true"/>
                        </button>

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form className="flex flex-1" action="#" method="GET">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <MagnifyingGlassIcon
                                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <input
                                        id="search-field"
                                        className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                                        placeholder="Search..."
                                        type="search"
                                        name="search"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <main className="lg:pr-10 lg:pl-10">
                        <header
                            className="border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                            <div className="md:flex md:items-center md:justify-between">
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                        Dashboard
                                    </h2>
                                </div>
                                {/*<div className="mt-4 flex md:ml-4 md:mt-0">*/}
                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"*/}
                                {/*    >*/}
                                {/*        Add a product*/}
                                {/*    </button>*/}
                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        className="ml-3 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                                {/*    >*/}
                                {/*        Request payment*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        </header>

                        <div>

                            <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
                                <div
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                                    <dt className="text-sm font-medium leading-6 text-gray-500">Total Revenue</dt>
                                    {/*<dd className="text-xs font-medium text-gray-700">+4.75%</dd>*/}
                                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                        ${totalRevenue}
                                    </dd>
                                </div>
                                <div
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                                    <dt className="text-sm font-medium leading-6 text-gray-500">
                                        Orders
                                    </dt>
                                    {/*<dd className="text-xs font-medium text-rose-600">+54.02%</dd>*/}
                                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                        {orders.length}
                                    </dd>
                                </div>
                                <div
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                                    <dt className="text-sm font-medium leading-6 text-gray-500">
                                        Pending Orders
                                    </dt>
                                    {/*<dd className="text-xs font-medium text-gray-700">-1.39%</dd>*/}
                                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                        {pendingOrdersCount}
                                    </dd>
                                </div>
                                <div
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
                                    <dt className="text-sm font-medium leading-6 text-gray-500">All Customers</dt>
                                    {/*<dd className="text-xs font-medium text-rose-600">+10.18%</dd>*/}
                                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                        {userCount}
                                    </dd>
                                </div>
                            </dl>


                            {/* Main 3 column grid */}
                            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8 mt-10">
                                {/* Left column */}
                                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                                    <section aria-labelledby="section-1-title">
                                        <h2 className="text-primary" id="section-1-title">
                                            Recent Orders
                                        </h2>
                                        <div className="overflow-hidden rounded-lg bg-white shadow">
                                            <div className="p-6">
                                                <div>
                                                    <ul role="list" className="divide-y divide-gray-100">
                                                        {orders.slice(0, 4).map((order) => (
                                                            <li key={order.id}
                                                                className="flex items-center justify-between gap-x-6 py-5">
                                                                <div className="flex gap-x-4">
                                                                    <img
                                                                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                                                        src={`${assetServer}/images/products/${order.image}`}
                                                                        alt=""/>
                                                                    <div className="min-w-0 flex-auto">
                                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{order.product_name}</p>
                                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => navigate(`/order-details/${order.id}`)}
                                                                    className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                                >
                                                                    View
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <a
                                                        href="/orders"
                                                        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                                                    >
                                                        View all
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                    </section>
                                </div>

                                {/* Right column */}
                                <div className="grid grid-cols-1 gap-4">
                                    <section aria-labelledby="section-2-title">
                                        <h2 className="text-primary" id="section-2-title">
                                            Recent Products
                                        </h2>
                                        <div className="overflow-hidden rounded-lg bg-white shadow">
                                            <div className="p-6">
                                                <div className="flow-root">
                                                    <ul role="list" className="-mb-8">
                                                        {products.slice(0, 4).map((product) => (
                                                            <tr key={product.id}>
                                                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                    <div className="flex items-center">
                                                                        <div className="h-11 w-11 flex-shrink-0">
                                                                            <img className="h-11 w-11 rounded-full"
                                                                                 src={`${assetServer}/images/products/${product.image}`}
                                                                                 alt=""/>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div
                                                                                className="font-medium text-gray-900">{product.product_name}</div>
                                                                            <div
                                                                                className="mt-1 text-gray-500">$ {product.price}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            {/* Activity list */}
                            <div className="px-4 sm:px-6 lg:px-8 mt-50 mb-50">
                                <div className="sm:flex sm:items-center mt-50">
                                    <h2 className="text-primary" id="section-2-title">
                                        30 days of user activities
                                    </h2>

                                </div>
                                <div className="mt-8 flow-root">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <table className="min-w-full divide-y divide-gray-300">
                                                <thead>
                                                <tr>
                                                    <th scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                        Product & id
                                                    </th>
                                                    <th scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Title
                                                    </th>
                                                    <th scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Status
                                                    </th>
                                                    <th scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                        Date & Time
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                {activityItems.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        {item.orders && item.orders.map((order) => (
                                                            <tr key={order.id}>
                                                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                    <div className="flex items-center">
                                                                        <div className="h-11 w-11 flex-shrink-0">
                                                                            <ShoppingBagIcon className="h-8 w-8 text-gray-400"
                                                                                             aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div
                                                                                className="font-medium text-gray-900">{order.product_name}</div>
                                                                            <div className="mt-1 text-gray-500">{order.id}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    <div className="text-gray-900">{order.vendor.store_name}</div>
                                                                    <div className="mt-1 text-gray-500">{order.price}</div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                  <span
                                                                      className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {order.status}
                                                                  </span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    {new Date(order.created_at).toLocaleString()}
                                                                </td>

                                                            </tr>
                                                        ))}

                                                        {/*payments*/}
                                                        {item.payments && item.payments.map((payment) => (
                                                            <tr key={payment.id}>
                                                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                    <div className="flex items-center">
                                                                        <div className="h-11 w-11 flex-shrink-0">
                                                                            <WalletIcon className="h-8 w-8 text-gray-400" aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div
                                                                                className="font-medium text-gray-900">{payment.product.product_name}</div>
                                                                            <div className="mt-1 text-gray-500">{payment.id}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    <div className="text-gray-900">{payment.total_cost}</div>
                                                                    <div className="mt-1 text-gray-500">{payment.product_cost}</div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                  <span
                                                                      className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {payment.order_status}
                                                                  </span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    {new Date(payment.created_at).toLocaleString()}
                                                                </td>

                                                            </tr>
                                                        ))}

                                                        {/*reviews*/}
                                                        {item.reviews && item.reviews.map((review) => (
                                                            <tr key={review.id}>
                                                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                    <div className="flex items-center">
                                                                        <div className="h-11 w-11 flex-shrink-0">
                                                                            <StarIcon className="h-8 w-8 text-gray-400" aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div
                                                                                className="font-medium text-gray-900">{review.product.product_name}</div>
                                                                            <div className="mt-1 text-gray-500">{review.id}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    <div className="text-gray-900">{review.rating}</div>
                                                                    <div className="mt-1 text-gray-500">{review.comment}</div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                  <span
                                                                      className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {review.reported === 1 ? 'Reported to Admin' : 'Not Reported'}
                                                                  </span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    {new Date(review.created_at).toLocaleString()}
                                                                </td>

                                                            </tr>
                                                        ))}

                                                        {/*groups*/}
                                                        {item.groups && item.groups.map((group) => (
                                                            <tr key={group.id}>
                                                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                    <div className="flex items-center">
                                                                        <div className="h-11 w-11 flex-shrink-0">
                                                                            <UserGroupIcon className="h-8 w-8 text-gray-400"
                                                                                           aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div className="font-medium text-gray-900">{group.name}</div>
                                                                            <div className="mt-1 text-gray-500">{group.group_id}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    <div className="text-gray-900">{group.role}</div>
                                                                    <div className="mt-1 text-gray-500">{group.product.product_name} </div>
                                                                </td>

                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {group.status}
                                                                    </span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    {new Date(group.created_at).toLocaleString()}
                                                                </td>

                                                            </tr>
                                                        ))}

                                                        {item.ads && item.ads.map((ad) => (
                                                            <tr key={ad.id}>
                                                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                    <div className="flex items-center">
                                                                        <div className="h-11 w-11 flex-shrink-0">
                                                                            <StarIcon className="h-8 w-8 text-gray-400" aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div
                                                                                className="font-medium text-gray-900">{ad.product.product_name}</div>
                                                                            <div className="mt-1 text-gray-500">{ad.id}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    <div className="text-gray-900">{ad.duration}</div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                  <span
                                                                      className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {ad.status}
                                                                  </span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    {new Date(ad.created_at).toLocaleString()}
                                                                </td>

                                                            </tr>
                                                        ))}

                                                        {/*groups*/}
                                                        {item.products && item.products.map((product) => (
                                                            <tr key={product.id}>
                                                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                    <div className="flex items-center">
                                                                        <div className="h-11 w-11 flex-shrink-0">
                                                                            <UserGroupIcon className="h-8 w-8 text-gray-400"
                                                                                           aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div className="font-medium text-gray-900">{product.product_name}</div>
                                                                            <div className="mt-1 text-gray-500">{product.id}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    <div className="text-gray-900">{product.price}</div>
                                                                    <div className="mt-1 text-gray-500">{product.category} </div>
                                                                </td>

                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                            {product.status}
                                                            </span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                    {new Date(product.created_at).toLocaleString()}
                                                                </td>

                                                            </tr>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </>
    )
}

export default Dashboard