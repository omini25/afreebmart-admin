import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
    FolderIcon,
    GlobeAltIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {
    Bars3Icon,
    BuildingStorefrontIcon,
    IdentificationIcon, ListBulletIcon,
    MagnifyingGlassIcon, TagIcon,
    UserGroupIcon
} from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';
import {
    ArrowRightStartOnRectangleIcon, BackspaceIcon,
    InboxStackIcon,
    ShoppingBagIcon,
    ShoppingCartIcon, StarIcon,
    TruckIcon, UserCircleIcon,
    WalletIcon
} from "@heroicons/react/20/solid/index.js";
import banknotesIcon from "@heroicons/react/16/solid/esm/BanknotesIcon.js";
import {assetServer} from "../../../assetServer.js";
import axios from "axios";
import {server} from "../../server.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";



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
    { name: 'Users', href: '/users', icon: UserGroupIcon, current: false },
    { name: 'Vendors', href: '/vendors', icon: BuildingStorefrontIcon, current: false },
    { name: 'Deliverers', href: '/deliverers', icon: BackspaceIcon, current: false },
    { name: 'Admins', href: '/admins', icon: IdentificationIcon, current: false },
    { name: 'Coupons', href: '/coupons', icon: TagIcon, current: false },
    { name: 'Reviews', href: '/reviews', icon: StarIcon, current:false},
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: true },
]




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}





export const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [image, setImage] = useState(user? user.user.image : '');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        let userData = {};

        if (name) userData.name = name;
        if (phone) userData.phone = phone;
        if (email) userData.email = email;
        if (password) userData.password = password;
        if (image) userData.image = image;

        try {
            const response = await axios.put(`${server}/user/${user.user.id}`, userData);
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
            const response = await axios.delete(`${server}/delete/user/${user.user.id}`);

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
                                                    alt="Afreebmart Vendor"
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
                                    src="src/assets/afreemart-logo.png"
                                    alt="Afreebmart Vendor"
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
                                            Use an active email if you want to receive mail notifications.
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
                                                        placeholder={user? user.user.name : ''}
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
                                                        placeholder={user? user.user.phone : ''}
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
                                                        placeholder={user ? user.user.email : ''}
                                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div
                                    className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                                    <div>
                                        <h2 className="text-base font-semibold leading-7 text-black">Change
                                            password</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-400">
                                            Update your password associated with your account.
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">

                                            <div className="col-span-full">
                                                <label htmlFor="new-password"
                                                       className="block text-sm font-medium leading-6 text-black">
                                                    New password
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="new-password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="new-password"
                                                        value={password}
                                                        onChange={e => setPassword(e.target.value)}
                                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="confirm-password"
                                                       className="block text-sm font-medium leading-6 text-black">
                                                    Confirm password
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="confirm-password"
                                                        name="confirm_password"
                                                        type="password"
                                                        autoComplete="new-password"
                                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                                    />
                                                </div>
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
                            </form>


                            <div
                                className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                                <div>
                                    <h2 className="text-base font-semibold leading-7 text-black">Delete account</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">
                                        No longer want to use our service? You can delete your account here. This action
                                        is not reversible.
                                        All information related to this account will be deleted permanently.
                                    </p>
                                </div>

                                <form className="flex items-start md:col-span-2">
                                    <button
                                        type="button"
                                        onClick={handleDeleteAccount}
                                        className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                                    >
                                        Yes, delete my account
                                    </button>
                                </form>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </>
    )
}

export default Profile