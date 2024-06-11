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
import { CheckIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';



const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: false },
    { name: 'Orders', href: '/orders', icon: ServerIcon, current: false },
    { name: 'Products', href: '/products', icon: SignalIcon, current: true },
    { name: 'Ads', href: '/account/groups', icon: GlobeAltIcon, current: false },
    { name: 'Messages', href: '/messages', icon: ChartBarSquareIcon, current: false },
    { name: 'Payment History', href: '/payments', icon: Cog6ToothIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserIcon, current: false },
]

const people = [
    {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export const Products = () => {
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
                        <div className="bg-white">


                            <main className="pb-14 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
                                <div className="px-4 sm:px-6 lg:px-8">
                                    <div className="sm:flex sm:items-center">
                                        <div className="sm:flex-auto">
                                            <h1 className="text-base font-semibold leading-6 text-gray-900">Products</h1>
                                            <p className="mt-2 text-sm text-gray-700">
                                                A list of all the products you have added
                                            </p>
                                        </div>
                                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                            <button
                                                type="button"
                                                className="block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Add product
                                            </button>
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
                                                            Product
                                                        </th>
                                                        <th scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Customer
                                                        </th>
                                                        <th scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Status
                                                        </th>
                                                        <th scope="col"
                                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                            Date
                                                        </th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                            <span className="sr-only">Action</span>
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                    {people.map((person) => (
                                                        <tr key={person.email}>
                                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                                <div className="flex items-center">
                                                                    <div className="h-11 w-11 flex-shrink-0">
                                                                        <img className="h-11 w-11 rounded-full"
                                                                             src={person.image} alt=""/>
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div
                                                                            className="font-medium text-gray-900">{person.name}</div>
                                                                        <div
                                                                            className="mt-1 text-gray-500">{person.email}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                                <div className="text-gray-900">{person.title}</div>
                                                                <div
                                                                    className="mt-1 text-gray-500">{person.department}</div>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                              <span
                                                                  className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                Active
                                                              </span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.role}</td>
                                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                <a href="#"
                                                                   className="text-indigo-600 hover:text-indigo-900">
                                                                    View/Edit<span className="sr-only">, {person.name}</span>
                                                                </a>
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

                </div>
            </div>
        </>
    )
}

export default Products