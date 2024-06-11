import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    ChartBarSquareIcon,
    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    ServerIcon,
    SignalIcon, UserIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';



const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: true },
    { name: 'Orders', href: '/orders', icon: ServerIcon, current: false },
    { name: 'Wishlist', href: '/wishlist', icon: SignalIcon, current: false },
    { name: 'Groups', href: '/account/groups', icon: GlobeAltIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChartBarSquareIcon, current: false },
    { name: 'Payment History', href: '/payments', icon: Cog6ToothIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserIcon, current: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const stats = [
    { id: 1, name: 'Total Orders', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
    { id: 2, name: 'Pending Orders', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
    { id: 3, name: 'Wishlist', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
]


export const Dashboard = () => {
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false)

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
                                            <a href="/">
                                                <img
                                                    className="h-8 w-auto"
                                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                    alt="Your Company"
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
                                                                            ? 'bg-gray-800 text-white'
                                                                            : 'text-gray-400 hover:text-white hover:primary',
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
                                                            dispatch(logout()); // dispatch the logout action when the link is clicked
                                                        }}
                                                        className={classNames(
                                                            'text-gray-400 hover:text-white hover:bg-gray-800',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                        )}
                                                    >
                                                        <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                                        Log out
                                                    </a>
                                                </li>

                                                <li className="-mx-6 mt-auto">
                                                    <a
                                                        href="/"
                                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:bg-gray-800"
                                                    >
                                                        <img
                                                            className="h-8 w-8 rounded-full bg-gray-800"
                                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt=""
                                                        />
                                                        <span className="sr-only">Your profile</span>
                                                        <span aria-hidden="true">Tom Cook</span>
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
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
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
                                            dispatch(logout()); // dispatch the logout action when the link is clicked
                                        }}
                                        className={classNames(
                                            'text-gray-400 hover:bg-red-800 hover:secondary',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                    >
                                        <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                        Log out
                                    </a>
                                </li>

                                <li className="-mx-6 mt-auto">
                                    <a
                                        href="/profile"
                                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-secondary hover:bg-gray-800"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full bg-gray-800"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <span aria-hidden="true">Tom Cook</span>
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
                            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
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
                                {/*        Edit*/}
                                {/*    </button>*/}
                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
                                {/*    >*/}
                                {/*        Publish*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>


                        </header>

                        <div>

                            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {stats.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                                    >
                                        <dt>
                                            <div className="absolute rounded-md bg-indigo-500 p-3">
                                                <item.icon className="h-6 w-6 text-white" aria-hidden="true"/>
                                            </div>
                                            <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                                        </dt>
                                        <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                                            <p
                                                className={classNames(
                                                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                                    'ml-2 flex items-baseline text-sm font-semibold'
                                                )}
                                            >
                                                {item.changeType === 'increase' ? (
                                                    <ArrowUpIcon
                                                        className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                                                        aria-hidden="true"/>
                                                ) : (
                                                    <ArrowDownIcon
                                                        className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                                                        aria-hidden="true"/>
                                                )}

                                                <span
                                                    className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                                                {item.change}
                                            </p>
                                            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                                <div className="text-sm">
                                                    <a href="#"
                                                       className="font-medium text-indigo-600 hover:text-indigo-500">
                                                        View all<span className="sr-only"> {item.name} stats</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </main>

                </div>
            </div>
        </>
    )
}

export default Dashboard