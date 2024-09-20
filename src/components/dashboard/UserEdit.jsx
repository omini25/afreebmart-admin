import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'
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
    ListBulletIcon,
    ArrowRightStartOnRectangleIcon,
    BackspaceIcon, StarIcon,
} from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';
import axios from "axios";
import {server} from "../../server.js";
import {assetServer} from "../../../assetServer.js";
import banknotesIcon from "@heroicons/react/16/solid/esm/BanknotesIcon.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BarsArrowUpIcon, ChevronDownIcon} from "@heroicons/react/20/solid/index.js";
import AddProduct from "./AddProduct.jsx";
import {toast} from "react-toastify";






import logo from '../../assets/afreemart-logo.png'
const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: false },
    { name: 'Orders', href: '/orders', icon: ShoppingCartIcon, current: false },
    { name: 'Products', href: '/products', icon: ShoppingBagIcon, current: false },
    { name: 'Categories', href: '/categories', icon: ListBulletIcon, current: false },
    { name: 'Ads', href: '/ads', icon: GlobeAltIcon, current: false },
    { name: 'Deliveries', href: '/deliveries', icon: TruckIcon, current: false },
    { name: 'Payment History', href: '/payments', icon: banknotesIcon, current: false },
    { name: 'Payment Request', href: '/payments-requests', icon: WalletIcon, current: false },
    { name: 'Messages', href: '/messages', icon: InboxStackIcon, current: false },
    { name: 'Users', href: '/users', icon: UserGroupIcon, current: true },
    { name: 'Vendors', href: '/vendors', icon: BuildingStorefrontIcon, current: false },
    { name: 'Deliverers', href: '/deliverers', icon: BackspaceIcon, current: false },
    // { name: 'Admins', href: '/admins', icon: IdentificationIcon, current: false },
    { name: 'Coupons', href: '/coupons', icon: TagIcon, current: false },
    { name: 'Reviews', href: '/reviews', icon: StarIcon, current:false},
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
]



const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export const UserEdit = () => {
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;
    const navigate = useNavigate();
    // const [vendorDetails, setVendorDetails] = useState(null);

    const [currentTab, setCurrentTab] = useState('Overview');

    const secondaryNavigation = [
        { name: 'Overview', onClick: () => setCurrentTab('Overview') },
        { name: 'Orders', onClick: () => setCurrentTab('Orders') },
        { name: 'Groups', onClick: () => setCurrentTab('Products') },

        { name: 'Transactions', onClick: () => setCurrentTab('Transactions') },
        { name: 'Settings', onClick: () => setCurrentTab('Settings') },
    ];


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
                            <a href="/">
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
                                            navigate('/');// dispatch the logout action when the link is clicked
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
                </div>

                <div className="xl:pl-72">
                    {/* Sticky search header */}
                    <div
                        className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
                        <button type="button" className="-m-2.5 p-2.5 text-black xl:hidden"
                                onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-5 w-5" aria-hidden="true"/>
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

                    <main>
                        <header>
                            {/* Secondary navigation */}
                            <nav className="flex overflow-x-auto border-b border-white/10 py-4">
                                <ul
                                    role="list"
                                    className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                                >
                                    {secondaryNavigation.map((item) => (
                                        <li key={item.name}>
                                            <button onClick={item.onClick}
                                                    className={currentTab === item.name ? 'text-indigo-400' : ''}>
                                                {item.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </header>

                        <div>
                            {currentTab === 'Overview' && <OverviewContent setCurrentTab={setCurrentTab}/>}
                            {currentTab === 'Products' && <ProductsContent setCurrentTab={setCurrentTab}/>}
                            {currentTab === 'Orders' && <OrdersContent setCurrentTab={setCurrentTab}/>}
                            {currentTab === 'Transactions' && <TransactionsContent setCurrentTab={setCurrentTab}/>}
                            {currentTab === 'Settings' && <SettingsContent setCurrentTab={setCurrentTab}/>}
                            {/* ... */}
                        </div>

                    </main>

                </div>
            </div>
        </>
    );
};

const OverviewContent = ({ setCurrentTab }) => {
    const [vendorDetails, setVendorDetails] = useState(null);
    const [activityItems, setActivityItems] = useState([]);

    const {id} = useParams();

    const [isLoading, setIsLoading] = useState(true); // Add this line


    useEffect(() => {
        const fetchVendorDetails = async () => {
            setIsLoading(true); // Set loading state to true before starting the API call
            try {
                const response = await axios.get(`${server}/admin/all-user-details/${id}`);
                setVendorDetails(response.data);
                console.log(response)
            } catch (error) {
                console.error('Failed to fetch vendor details:', error);
            }
            setIsLoading(false); // Set loading state to false after the API call has completed
        };

        fetchVendorDetails();
    }, [id]);

    useEffect(() => {
        const fetchActivityItems = async () => {
            try {
                // Replace with your own API endpoint
                const response = await axios.get(`${server}/user/${id}/actions`);
                setActivityItems(response.data);
            } catch (error) {
                console.error('Failed to fetch activity items:', error);
            }
        };

        fetchActivityItems();
    }, []);


    if (isLoading) {
        return (
            <div className="spinner">
                <style>{`
                .spinner {
                    margin: 100px auto;
                    width: 50px;
                    height: 40px;
                    text-align: center;
                    font-size: 10px;
                }

                .spinner > div {
                    background-color: #333;
                    height: 100%;
                    width: 6px;
                    display: inline-block;
                    margin: 0px 2px;
                    
                    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
                    animation: sk-stretchdelay 1.2s infinite ease-in-out;
                }

                .spinner .rect2 {
                    -webkit-animation-delay: -1.1s;
                    animation-delay: -1.1s;
                }

                .spinner .rect3 {
                    -webkit-animation-delay: -1.0s;
                    animation-delay: -1.0s;
                }

                .spinner .rect4 {
                    -webkit-animation-delay: -0.9s;
                    animation-delay: -0.9s;
                }

                .spinner .rect5 {
                    -webkit-animation-delay: -0.8s;
                    animation-delay: -0.8s;
                }

                @-webkit-keyframes sk-stretchdelay {
                    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
                    20% { -webkit-transform: scaleY(1.0) }
                }

                @keyframes sk-stretchdelay {
                    0%, 40%, 100% { 
                        transform: scaleY(0.4);
                        -webkit-transform: scaleY(0.4);
                    }  20% { 
                        transform: scaleY(1.0);
                        -webkit-transform: scaleY(1.0);
                    }
                }
            `}</style>
                <div className="rect1"></div>
                <div className="rect2"></div>
                <div className="rect3"></div>
                <div className="rect4"></div>
                <div className="rect5"></div>
            </div>
        );
    }

    console.log(vendorDetails)


    const stats = [
        // { name: 'Products', value: vendorDetails.products ? vendorDetails.products.length : 0 },
        { name: 'Orders', value: vendorDetails && vendorDetails.orders ? vendorDetails.orders.length : 0 },
        { name: 'Groups', value: vendorDetails && vendorDetails.groups ? vendorDetails.groups.length : 0 },
        // { name: 'Wallet Balance', value: `$${vendorDetails.wallet.wallet_balance}` },
    ]

    return (
        <>
            <header>
                {/* Heading */}
                <div
                    className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <div
                                className={`flex-none rounded-full p-1 text-${vendorDetails?.status === 'Active' ? 'green-400' : 'red-400'}`}>
                                <div className="h-2 w-2 rounded-full bg-current"/>
                            </div>
                            <div className="flex gap-x-3 text-base leading-7">
                                <span className="font-semibold text-black">{vendorDetails?.name}</span>
                                <span className="text-gray-600">/</span>
                                <span className="font-semibold text-black">{vendorDetails?.email}</span>
                            </div>
                        </div>
                        <p className="mt-2 text-xs leading-6 text-gray-400">{vendorDetails?.phone}</p>
                    </div>
                    <div
                        className="order-first flex-none rounded-full bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-400/30 sm:order-none">
                        {vendorDetails?.status}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, statIdx) => (
                        <div
                            key={stat.name}
                            className={classNames(
                                statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                                'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'
                            )}
                        >
                            <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                            <p className="mt-2 flex items-baseline gap-x-2">
                                            <span
                                                className="text-4xl font-semibold tracking-tight text-black">{stat.value}</span>
                                {stat.unit ?
                                    <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                            </p>
                        </div>
                    ))}
                </div>
            </header>

            {/* Activity list */}
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">

                        <p className="mt-2 text-sm text-gray-700">
                            30 days of user activities
                        </p>
                    </div>
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
                                {vendorDetails.orders && vendorDetails.orders.map((order) => (
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
                                            {/*<div*/}
                                            {/*    className="text-gray-900">{order.vendor ? order.vendor.store_name : 'No vendor'}</div>*/}
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
                                {vendorDetails.payments && vendorDetails.payments.map((payment) => (
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
                                {vendorDetails.reviews && vendorDetails.reviews.map((review) => (
                                    <tr key={review.id}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <StarIcon className="h-8 w-8 text-gray-400" aria-hidden="true"/>
                                                </div>
                                                <div className="ml-4">
                                                    {/*<div*/}
                                                    {/*    className="font-medium text-gray-900">{review.product.product_name}</div>*/}
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
                                {activityItems.groups && activityItems.groups.map((group) => (
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ProductsContent = ({
    setCurrentTab
}) => {
    // const [vendorDetails, setVendorDetails] = useState(null);

    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;
    const [products, setProducts] = useState([]);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const navigate = useNavigate();
    const [selectedSort, setSelectedSort] = useState('Latest');
    const [searchTerm, setSearchTerm] = useState('');
    const {id} = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${server}/user/group/${id}`);

                setProducts(response.data.groups.flat());
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <>
            <main className="lg:pr-10 lg:pl-10">
                <div className="bg-white">


                    <main className="pb-14 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
                        <div className="px-4 sm:px-6 lg:px-8">


                            <div
                                className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Groups</h3>
                                <div className="mt-3 sm:ml-4 sm:mt-0">
                                    <label htmlFor="mobile-search-candidate" className="sr-only">
                                        Search
                                    </label>
                                    <label htmlFor="desktop-search-candidate" className="sr-only">
                                        Search
                                    </label>
                                    <div className="flex rounded-md shadow-sm">
                                        <div className="relative flex-grow focus-within:z-10">
                                            <div
                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"
                                                                     aria-hidden="true"/>
                                            </div>
                                            <input
                                                type="text"
                                                name="mobile-search-candidate"
                                                id="mobile-search-candidate"
                                                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                                                placeholder="Search"
                                                value={searchTerm}
                                                onChange={event => setSearchTerm(event.target.value)}
                                            />
                                            <input
                                                type="text"
                                                name="desktop-search-candidate"
                                                id="desktop-search-candidate"
                                                className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                                                placeholder="Search groups"
                                                value={searchTerm}
                                                onChange={event => setSearchTerm(event.target.value)}
                                            />
                                        </div>
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button
                                                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                    {selectedSort}
                                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400"
                                                                     aria-hidden="true"/>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="px-1 py-1 ">
                                                        {['Latest', 'Active', 'Suspended',].map((sort) => (
                                                            <Menu.Item key={sort}>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => setSelectedSort(sort)}
                                                                        className={`${
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                                    >
                                                                        {sort}
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>

                                </div>
                            </div>


                            <div className="mt-8 flow-root">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead>
                                            <tr>
                                                <th scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                    Name/Id
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Product
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Role
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Status
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Number of members
                                                </th>
                                                {/*<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">*/}
                                                {/*    <span className="sr-only">Action</span>*/}
                                                {/*</th>*/}
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                            {products.filter(product => {
                                                return (
                                                    product.group_id.toString().includes(searchTerm) ||
                                                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
                                                );
                                            }).sort((a, b) => {
                                                switch (selectedSort) {
                                                    case 'Latest':
                                                        return new Date(b.created_at) - new Date(a.created_at);
                                                    case 'Pending':
                                                        return a.status === 'active' ? -1 : 1;
                                                    case 'Suspended':
                                                        return a.status === 'suspended' ? -1 : 1;
                                                    case 'Active':
                                                        return a.status === 'Active' ? -1 : 1;
                                                    case 'Highest':
                                                        return b.price - a.price;
                                                    case 'Lowest':
                                                        return a.price - b.price;
                                                    default:
                                                        return 0;
                                                }
                                            }).map((product) => (
                                                <tr key={product.id}>
                                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-medium text-gray-900">{product.name}</div>
                                                                <div
                                                                    className="mt-1 text-gray-500">#{product.group_id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div
                                                            className="text-gray-900">{product.product_name}</div>

                                                    </td>

                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div className="text-gray-900">{product.role}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                <span
                                                                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {product.status}
                                                                </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div
                                                            className="text-gray-900">{product.users_count}</div>

                                                    </td>
                                                    {/*<td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">*/}
                                                    {/*    <Link to={`/product/${product.id}`}*/}
                                                    {/*          className="text-indigo-600 hover:text-indigo-900">*/}
                                                    {/*        View/Edit<span*/}
                                                    {/*        className="sr-only">, {product.name}</span>*/}
                                                    {/*    </Link>*/}
                                                    {/*</td>*/}
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>


                </div>
            </main>
        </>
    );
};


const OrdersContent = ({ setCurrentTab }) => {
    // const [vendorDetails, setVendorDetails] = useState(null);
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;
    const navigate = useNavigate();
    const [selectedSort, setSelectedSort] = useState('Latest');
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const {id} = useParams();



    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${server}/order/${id}`);
                if (response.data && Array.isArray(response.data.orders)) {
                    setOrders(response.data.orders);
                    console.log("Orders set successfully:", response.data.orders);
                } else {
                    console.error("Unexpected data structure:", response.data);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                // Optionally, update the UI to reflect the error state
            }
        };

        fetchOrders();
    }, []);


    return (
        <>
            <main className="lg:pr-10 lg:pl-10">
                <div className="bg-white">


                    <main className="pb-14 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <div
                                className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                                <h3 className="text-base font-semibold leading-6 text-gray-900">Orders</h3>
                                <div className="mt-3 sm:ml-4 sm:mt-0">
                                    <label htmlFor="mobile-search-candidate" className="sr-only">
                                        Search
                                    </label>
                                    <label htmlFor="desktop-search-candidate" className="sr-only">
                                        Search
                                    </label>
                                    <div className="flex rounded-md shadow-sm">
                                        <div className="relative flex-grow focus-within:z-10">
                                            <div
                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"
                                                                     aria-hidden="true"/>
                                            </div>
                                            <input
                                                type="text"
                                                name="mobile-search-candidate"
                                                id="mobile-search-candidate"
                                                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                                                placeholder="Search"
                                                value={searchTerm}
                                                onChange={event => setSearchTerm(event.target.value)}
                                            />
                                            <input
                                                type="text"
                                                name="desktop-search-candidate"
                                                id="desktop-search-candidate"
                                                className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                                                placeholder="Search orders"
                                                value={searchTerm}
                                                onChange={event => setSearchTerm(event.target.value)}
                                            />
                                        </div>
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button
                                                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                    {/*<SortAscendingIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                                                    {selectedSort}
                                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400"
                                                                     aria-hidden="true"/>
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <div className="px-1 py-1 ">
                                                        {['Latest', 'Highest', 'Lowest', 'Pending', 'Successful', 'Cancelled'].map((sort) => (
                                                            <Menu.Item key={sort}>
                                                                {({active}) => (
                                                                    <button
                                                                        onClick={() => setSelectedSort(sort)}
                                                                        className={`${
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                                    >
                                                                        {sort}
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flow-root">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead>
                                            <tr>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Product
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Price and Quantity
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Vendor
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Delivery Status
                                                </th>
                                                <th scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Date
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">View</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                            {orders.filter(order => {
                                                return (
                                                    order.id.toString().includes(searchTerm) ||
                                                    (order.product_name && order.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                                );
                                            }).sort((a, b) => {
                                                switch (selectedSort) {
                                                    case 'Latest':
                                                        return new Date(b.created_at) - new Date(a.created_at);
                                                    case 'Highest':
                                                        return b.total_price - a.total_price;
                                                    case 'Lowest':
                                                        return a.total_price - b.total_price;
                                                    case 'Pending':
                                                        return a.status === 'Pending' ? -1 : 1;
                                                    case 'Successful':
                                                        return a.status === 'Successful' ? -1 : 1;
                                                    case 'Cancelled':
                                                        return a.status === 'Cancelled' ? -1 : 1;
                                                    default:
                                                        return 0;
                                                }
                                            }).map((order) => (
                                                <tr key={order.id}>
                                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                        <div className="flex items-center">
                                                            <div className="h-11 w-11 flex-shrink-0">
                                                                {/* Ensure `order.image` is a string path to an image */}
                                                                <img className="h-11 w-11 rounded-full"
                                                                     src={`${assetServer}/images/products/${order.image}`}
                                                                     alt={order.product_name || 'Product image'}/>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-medium text-gray-900">{order.product_name || 'N/A'}</div>
                                                                <div className="mt-1 text-gray-500">#{order.id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div className="text-gray-900">$ {order.total_price}</div>
                                                        <div className="mt-1 text-gray-500">{order.quantity}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        {/* Check if `order.vendor` is an object and access a specific property, e.g., `name` */}
                                                        <div
                                                            className="mt-1 text-gray-500">{order.vendor && order.vendor.store_name || 'Vendor info not available'}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <span
                                                            className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        {/* Ensure `order.created_at` is a valid date string */}
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <Link to={`/order-details/${order.id}`}
                                                              className="text-indigo-600 hover:text-indigo-900">
                                                            View<span className="sr-only">, {order.id}</span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>


                </div>
            </main>
        </>
    );
};


const TransactionsContent = ({setCurrentTab}) => {
    // const [vendorDetails, setVendorDetails] = useState(null);

    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSort, setSelectedSort] = useState('Latest');
    const {id} = useParams();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`${server}/user/payments/${id}`);

                setPayments(response.data.flat());
            } catch (error) {
                console.error('Failed to fetch payments:', error);
            }
        };

        fetchPayments();
    }, []);

    console.log(payments);

    return (
        <>
            <main className="lg:pr-10 lg:pl-10 pb-14 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
                <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Payment History</h3>
                    <div className="mt-3 sm:ml-4 sm:mt-0">
                        <label htmlFor="mobile-search-candidate" className="sr-only">
                            Search
                        </label>
                        <label htmlFor="desktop-search-candidate" className="sr-only">
                            Search
                        </label>
                        <div className="flex rounded-md shadow-sm">
                            <div className="relative flex-grow focus-within:z-10">
                                <div
                                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    type="text"
                                    name="mobile-search-candidate"
                                    id="mobile-search-candidate"
                                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={event => setSearchTerm(event.target.value)}
                                />
                                <input
                                    type="text"
                                    name="desktop-search-candidate"
                                    id="desktop-search-candidate"
                                    className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                                    placeholder="Search Payments"
                                    value={searchTerm}
                                    onChange={event => setSearchTerm(event.target.value)}
                                />
                            </div>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button
                                        className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        Sort
                                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {['Latest', 'Paid', 'Unpaid', 'Highest', 'Lowest'].map((status, statusIdx) => (
                                                <Menu.Item key={statusIdx}>
                                                    {({active}) => (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedSort(status);
                                                                const sortedPayments = [...payments].sort((a, b) => {
                                                                    switch (status) {
                                                                        case 'Latest':
                                                                            return new Date(b.created_at) - new Date(a.created_at);
                                                                        case 'Paid':
                                                                            return a.payment_status === 'Paid' ? -1 : 1;
                                                                        case 'Unpaid':
                                                                            return a.payment_status === 'Unpaid' ? -1 : 1;
                                                                        case 'Highest':
                                                                            return b.product_cost - a.product_cost;
                                                                        case 'Lowest':
                                                                            return a.product_cost - b.product_cost;
                                                                        default:
                                                                            return 0;
                                                                    }
                                                                });
                                                                setPayments(sortedPayments);
                                                            }}
                                                            className={`${
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                            } group flex items-center w-full px-2 py-2 text-sm`}
                                                        >
                                                            {status}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <div>

                    <div className="px-4 sm:px-6 lg:px-8">

                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                        <tr>
                                            <th scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Product Name & Payment Id
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Total Price
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Vendor $ Product Price
                                            </th>
                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>

                                            <th scope="col"
                                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Order Status
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {payments
                                            .filter(payment => {
                                                // Modify this condition to match your search criteria
                                                return (
                                                    // payment && payment.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    // payment.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    payment.id.toString().includes(searchTerm) ||
                                                    payment.store_name.toLowerCase().includes(searchTerm.toLowerCase())
                                                );
                                            })
                                            .sort((a, b) => {
                                                // Modify this switch statement to match your sort options
                                                switch (selectedSort) {
                                                    case 'Latest':
                                                        return new Date(b.created_at) - new Date(a.created_at);
                                                    case 'Paid':
                                                        return a.payment_status === 'Paid' ? -1 : 1;
                                                    case 'Unpaid':
                                                        return a.payment_status === 'Unpaid' ? -1 : 1;
                                                    case 'Highest':
                                                        return b.product_cost - a.product_cost;
                                                    case 'Lowest':
                                                        return a.product_cost - b.product_cost;
                                                    default:
                                                        return 0;
                                                }
                                            })
                                            .map((payment) => (
                                                <tr key={payment.id}>
                                                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                        <div className="flex items-center">

                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-medium text-gray-900">{payment.product_name}</div>
                                                                <div
                                                                    className="mt-1 text-gray-500">#{payment.id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div className="text-gray-900"> $ {payment.total_cost}</div>

                                                    </td>

                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div className="text-gray-900">{payment.store_name}</div>
                                                        <div
                                                            className="mt-1 text-gray-500">#{payment.product_cost}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                <span
                                                                    className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {payment.payment_status}
                                                                </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                        <div
                                                            className="text-gray-900">{payment.order_status}</div>

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

const SettingsContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');

    const {id} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${server}/admin/all-user-details/${id}`); // replace with your API endpoint
                const user = response.data;
                setUser(user);
                // setEmail(user.email);
                // setName(user.name);
                // setPhone(user.phone);
                // setImage(user.image);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUser();
    }, []);




    const handleSubmit = async (event) => {
        event.preventDefault();

        let userData = {};

        if (name) userData.name = name;
        if (phone) userData.phone = phone;
        if (email) userData.email = email;
        if (image) userData.image = image;

        try {
            const response = await axios.put(`${server}admin/user/update/${id}`, userData);
            console.log(response.data);

            // Update user data in the state
            setUser({
                ...user,
                user: response.data
            });

            // Update user data in the localStorage
            localStorage.setItem('user', JSON.stringify({
                ...user,
                user: response.data
            }));

            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteAccount = async () => {
        try {
            // Send a DELETE request to the external API
            const response = await axios.delete(`${server}/delete/user/${id}`);

            if (response.status === 200) {
                // Log the user out
                dispatch(logout());

                // Clear the local storage
                localStorage.clear();

                // Display a success message
                toast.success('Account deleted successfully!');

                // Redirect to the "/" page
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <main className="lg:pr-10 lg:pl-10">
                {/* Settings forms */}
                <div className="divide-y divide-white/5">
                    <form onSubmit={handleSubmit}>
                        <div
                            className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-black">Personal
                                    Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-400">
                                    User information.
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full flex items-center gap-x-8">
                                        <img
                                            src={`${assetServer}/images/users/${image}`}
                                            alt=""
                                            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                                        />
                                        <div>
                                            <input
                                                type="file"
                                                id="avatar"
                                                name="avatar"
                                                accept="image/png, image/jpeg"
                                                onChange={e => setImage(e.target.files[0])}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="avatar"
                                                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/20 cursor-pointer"
                                            >
                                                Change avatar
                                            </label>
                                            <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG.
                                                1MB max.</p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name"
                                               className="block text-sm font-medium leading-6 text-black">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder={user ? user.name : ''}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name"
                                               className="block text-sm font-medium leading-6 text-black">
                                            Phone Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                autoComplete="phone"
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                placeholder={user ? user.phone : ''}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-black">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder={user ? user.email : ''}
                                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-8 flex">
                                        <button
                                            type="submit"
                                            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        >
                                            Save
                                        </button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </form>


                    <div
                        className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-base font-semibold leading-7 text-black">Delete account</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                This can not be undone
                            </p>
                        </div>

                        <form className="flex items-start md:col-span-2">
                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                            >
                                Yes, delete account
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};

export default UserEdit