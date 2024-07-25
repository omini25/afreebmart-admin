import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import {
    FolderIcon,
    GlobeAltIcon,
    XMarkIcon,
    Bars3Icon,
    BuildingStorefrontIcon, IdentificationIcon,
    InboxStackIcon,
    MagnifyingGlassIcon, TagIcon, UserCircleIcon,
    UserGroupIcon,
    ShoppingBagIcon, ShoppingCartIcon, TruckIcon, WalletIcon, ListBulletIcon,
} from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';
import axios from "axios";
import {server} from "../../server.js";
import {assetServer} from "../../../assetServer.js";
import banknotesIcon from "@heroicons/react/16/solid/esm/BanknotesIcon.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ArrowRightStartOnRectangleIcon, BackspaceIcon, StarIcon} from "@heroicons/react/20/solid/index.js";



const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: false },
    { name: 'Orders', href: '/orders', icon: ShoppingCartIcon, current: true },
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
    { name: 'Admins', href: '/admins', icon: IdentificationIcon, current: false },
    { name: 'Coupons', href: '/coupons', icon: TagIcon, current: false },
    {name: 'Reviews', href: '/reviews', icon: StarIcon, current:false},
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export const OrderDetails = () => {
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const userItem = localStorage.getItem('user');
    const user = userItem ? JSON.parse(userItem) : null;
    const navigate = useNavigate();

    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${server}/admin/orders/${id}`);
                // Flatten the array structure
                const flattenedOrders = response.data.flat()[0];
                setOrder(flattenedOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrder();
    }, []);

    const statusToStep = {
        'pending': 1,
        'processing': 2,
        'shipped': 3,
        'completed': 4,
    };

    const step = order ? statusToStep[order.status] || 0 : 0;

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
                                                    src="src/assets/afreemart-logo.png"
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
                                    src="src/assets/afreemart-logo.png"
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

                    <main className="lg:pr-10 lg:pl-10">
                        <div className="bg-white">


                            <div className="pb-14 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
                                <div className="bg-gray-50">
                                    <div className="mx-auto max-w-2xl pt-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                        <div
                                            className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
                                            <div className="flex sm:items-baseline sm:space-x-4">
                                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order
                                                    #{id}</h1>

                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Order placed{' '}
                                                <time dateTime="2021-03-22" className="font-medium text-gray-900">
                                                    {order && new Date(order.created_at).toLocaleDateString()}
                                                </time>
                                            </p>
                                        </div>

                                        {/* Products */}
                                        <div className="mt-6">
                                            <h2 className="sr-only">Products purchased</h2>
                                            <div className="space-y-8">
                                                {order && (
                                                    <div
                                                        className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                                                    >
                                                        <div
                                                            className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                                                            <div className="sm:flex lg:col-span-7">
                                                                <div
                                                                    className="aspect-h-1 aspect-w-1 w-full flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:h-40 sm:w-40">
                                                                    <img
                                                                        src={`${assetServer}/images/products/${order.image}`}
                                                                        alt={order.product_name}
                                                                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                                                    />
                                                                </div>

                                                                <div className="mt-6 sm:ml-6 sm:mt-0">
                                                                    <h3 className="text-base font-medium text-gray-900">
                                                                        <a href="#">{order.product_name}</a>
                                                                    </h3>
                                                                    <p className="mt-2 text-sm font-medium text-gray-900">Price - ${order.price}</p>
                                                                    <p className="mt-3 text-sm text-gray-500">Vendor - {order.store_name}</p>
                                                                </div>
                                                            </div>

                                                            <div className="mt-6 lg:col-span-5 lg:mt-0">
                                                                <dl className="grid grid-cols-2 gap-x-6 text-sm">
                                                                    <div>
                                                                        <dt className="font-medium text-gray-900">Delivery
                                                                            address
                                                                        </dt>
                                                                        <dd className="mt-3 text-gray-500">
                                                                            <span
                                                                                className="block">{order.shipping_address}
                                                                            </span>

                                                                        </dd>
                                                                        <dt className="mt-3 font-medium text-gray-900">Delivery
                                                                            Person
                                                                        </dt>
                                                                        <dd className="mt-3 text-gray-500">
                                                                            <span
                                                                                className="block">{order.deliverer}
                                                                            </span>

                                                                        </dd>
                                                                    </div>
                                                                    <div>
                                                                        <dt className="font-medium text-gray-900">Customer Details
                                                                        </dt>
                                                                        <dd className="mt-3 space-y-3 text-gray-500">
                                                                            <p>{order.user && order.user.name}</p>
                                                                            <p>{order.user && order.user.phone}</p>
                                                                            <p>{order.user && order.user.email}</p>
                                                                            {/*<button type="button"*/}
                                                                            {/*        className="font-medium text-primary hover:text-indigo-500">*/}
                                                                            {/*    Edit*/}
                                                                            {/*</button>*/}
                                                                        </dd>
                                                                    </div>
                                                                </dl>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="border-t border-gray-200 px-4 py-6 sm:px-6 lg:p-8">
                                                            <h4 className="sr-only">Status</h4>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {order.status} on -
                                                                <time dateTime="2021-03-22"
                                                                                        className="font-medium text-gray-900">
                                                                 {new Date(order.updated_at).toLocaleDateString()}
                                                            </time>
                                                            </p>
                                                            <div className="mt-6" aria-hidden="true">
                                                                <div
                                                                    className="overflow-hidden rounded-full bg-gray-200">
                                                                    <div
                                                                        className="h-2 rounded-full bg-primary"
                                                                        style={{width: `calc((${step} * 2 + 1) / 8 * 100%)`}}
                                                                    />
                                                                </div>
                                                                <div
                                                                    className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
                                                                    <div className="text-primary">Order placed</div>
                                                                    <div
                                                                        className={classNames(order.status === 'pending' ? 'text-primary' : '', 'text-center')}>
                                                                        Processing
                                                                    </div>
                                                                    <div
                                                                        className={classNames(order.status === 'shipped' ? 'text-primary' : '', 'text-center')}>
                                                                        Shipped
                                                                    </div>
                                                                    <div
                                                                        className={classNames(order.status === 'completed' ? 'text-primary' : '', 'text-right')}>
                                                                        Delivered
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/*/!* Billing *!/*/}
                                        {/*<div className="mt-16">*/}
                                        {/*    <h2 className="sr-only">Billing Summary</h2>*/}

                                        {/*    <div*/}
                                        {/*        className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">*/}
                                        {/*        <table*/}
                                        {/*            className="table-auto text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">*/}
                                        {/*            <tbody>*/}
                                        {/*            <tr>*/}
                                        {/*                <td className="font-medium text-gray-900">Billing address</td>*/}
                                        {/*                <td className="mt-3 text-gray-500">*/}
                                        {/*                    <div>Floyd Miles</div>*/}
                                        {/*                    <div>7363 Cynthia Pass</div>*/}
                                        {/*                    <div>Toronto, ON N3Y 4H8</div>*/}
                                        {/*                </td>*/}
                                        {/*            </tr>*/}
                                        {/*            <tr>*/}
                                        {/*                <td className="font-medium text-gray-900">Payment information*/}
                                        {/*                </td>*/}
                                        {/*                <td className="-ml-4 -mt-1 flex flex-wrap">*/}
                                        {/*                    <div className="ml-4 mt-4 flex-shrink-0">*/}
                                        {/*                        /!* SVG for Visa logo *!/*/}
                                        {/*                    </div>*/}
                                        {/*                    <div className="ml-4 mt-4">*/}
                                        {/*                        <div className="text-gray-900">Ending with 4242</div>*/}
                                        {/*                        <div className="text-gray-600">Expires 02 / 24</div>*/}
                                        {/*                    </div>*/}
                                        {/*                </td>*/}
                                        {/*            </tr>*/}
                                        {/*            </tbody>*/}
                                        {/*        </table>*/}

                                        {/*        <table*/}
                                        {/*            className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">*/}
                                        {/*            <tbody>*/}
                                        {/*            <tr>*/}
                                        {/*                <td className="text-gray-600">Subtotal</td>*/}
                                        {/*                <td className="font-medium text-gray-900">$72</td>*/}
                                        {/*            </tr>*/}
                                        {/*            <tr>*/}
                                        {/*                <td className="text-gray-600">Shipping</td>*/}
                                        {/*                <td className="font-medium text-gray-900">$5</td>*/}
                                        {/*            </tr>*/}
                                        {/*            <tr>*/}
                                        {/*                <td className="text-gray-600">Tax</td>*/}
                                        {/*                <td className="font-medium text-gray-900">$6.16</td>*/}
                                        {/*            </tr>*/}
                                        {/*            <tr>*/}
                                        {/*                <td className="font-medium text-gray-900">Order total</td>*/}
                                        {/*                <td className="font-medium text-primary">$83.16</td>*/}
                                        {/*            </tr>*/}
                                        {/*            </tbody>*/}
                                        {/*        </table>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
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

export default OrderDetails