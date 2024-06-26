import {Fragment, useEffect, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {

    Cog6ToothIcon,
    FolderIcon,
    GlobeAltIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/actions';
import {
    ArrowRightStartOnRectangleIcon,
    BuildingStorefrontIcon, IdentificationIcon,
    InboxStackIcon,
    ListBulletIcon,
    ShoppingBagIcon,
    ShoppingCartIcon, TagIcon,
    TruckIcon, UserCircleIcon, UserGroupIcon,
    WalletIcon
} from "@heroicons/react/20/solid/index.js";
import banknotesIcon from "@heroicons/react/16/solid/esm/BanknotesIcon.js";
import {assetServer} from "../../../assetServer.js";
import {useNavigate} from "react-router-dom";
import { getChats, getMessages, sendMessage, createChat } from '../../api.js';



const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FolderIcon, current: false },
    { name: 'Orders', href: '/orders', icon: ShoppingCartIcon, current: false },
    { name: 'Products', href: '/products', icon: ShoppingBagIcon, current: false },
    { name: 'Categories', href: '/categories', icon: ListBulletIcon, current: false },
    { name: 'Ads', href: '/ads', icon: GlobeAltIcon, current: false },
    { name: 'Deliveries', href: '/deliveries', icon: TruckIcon, current: false },
    { name: 'Payment History', href: '/payments', icon: banknotesIcon, current: false },
    { name: 'Payment Request', href: '/payments-requests', icon: WalletIcon, current: false },
    { name: 'Messages', href: '/messages', icon: InboxStackIcon, current: true },
    { name: 'Users', href: '/users', icon: UserGroupIcon, current: false },
    { name: 'Vendors', href: '/vendors', icon: BuildingStorefrontIcon, current: false },
    { name: 'Admins', href: '/admins', icon: IdentificationIcon, current: false },
    { name: 'Coupons', href: '/coupons', icon: TagIcon, current: false },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, current: false },
]




function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export const Messages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newChatUserId, setNewChatUserId] = useState('');

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await getChats();
            setChats(response.data.threads);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    const fetchMessages = async (threadId) => {
        try {
            const response = await getMessages(threadId);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        fetchMessages(chat.id);
    };

    const handleSendMessage = async () => {
        try {
            await sendMessage(selectedChat.id, newMessage);
            setNewMessage('');
            fetchMessages(selectedChat.id);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleCreateChat = async () => {
        try {
            await createChat('New Chat', 'Hello!', [newChatUserId]);
            setShowModal(false);
            setNewChatUserId('');
            fetchChats();
        } catch (error) {
            console.error('Error creating chat:', error);
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
                        <header className="border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                            <div className="md:flex md:items-center md:justify-between">
                                <div className="min-w-0 flex-1">
                                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                        Messages
                                    </h2>
                                </div>
                                <div className="mt-4 flex md:ml-4 md:mt-0">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Start New Chat
                                    </button>
                                </div>
                            </div>
                        </header>

                        <div className="flex w-full h-full shadow-lg rounded-3xl">
                            <section className="flex flex-col pt-3 w-4/12 bg-gray-50 h-full overflow-y-scroll">
                                <label className="px-3">
                                    <input
                                        className="rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 w-full"
                                        placeholder="Search..."
                                    />
                                </label>
                                <ul className="mt-6">
                                    {chats.map((chat) => (
                                        <li
                                            key={chat.id}
                                            className={`py-5 border-b px-3 transition hover:bg-indigo-100 cursor-pointer ${
                                                selectedChat && selectedChat.id === chat.id ? 'bg-indigo-600 text-white' : ''
                                            }`}
                                            onClick={() => handleChatSelect(chat)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-lg font-semibold">{chat.subject}</h3>
                                                <p className={`text-md ${selectedChat && selectedChat.id === chat.id ? 'text-white' : 'text-gray-400'}`}>
                                                    {new Date(chat.updated_at).toLocaleString()}
                                                </p>
                                            </div>
                                            <div
                                                className={`text-md italic ${selectedChat && selectedChat.id === chat.id ? 'text-white' : 'text-gray-400'}`}>
                                                {chat.latest_message ? chat.latest_message.body : 'No messages yet'}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="w-8/12 px-4 flex flex-col bg-white rounded-r-3xl">
                                {selectedChat ? (
                                    <>
                                        <div className="flex justify-between items-center h-24 border-b-2 mb-8">
                                            <div className="flex space-x-4 items-center">
                                                <div className="h-12 w-12 rounded-full overflow-hidden">
                                                    <img
                                                        src="https://via.placeholder.com/50"
                                                        alt="Profile"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="font-semibold text-lg">{selectedChat.subject}</h3>
                                                    <p className="text-light text-gray-400">
                                                        {selectedChat.participants.length} participants
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-grow overflow-y-auto mb-4">
                                            {messages.map((message) => (
                                                <div key={message.id} className="mb-4">
                                                    <p className="font-semibold">{message.user.name}</p>
                                                    <p className="bg-gray-100 p-2 rounded-lg inline-block">{message.body}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <section className="mt-6 border rounded-xl bg-gray-50 mb-3">
              <textarea
                  className="w-full bg-gray-50 p-2 rounded-xl"
                  placeholder="Type your reply here..."
                  rows={3}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
              />
                                            <div className="flex items-center justify-between p-2">
                                                <button className="h-6 w-6 text-gray-400">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    className="bg-purple-600 text-white px-6 py-2 rounded-xl"
                                                    onClick={handleSendMessage}
                                                >
                                                    Reply
                                                </button>
                                            </div>
                                        </section>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-500 text-lg">Select a chat to view messages</p>
                                    </div>
                                )}
                            </section>
                        </div>

                        {showModal && (
                            <div
                                className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                                <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Start New Chat</h3>
                                    <input
                                        type="text"
                                        className="w-full p-2 mb-4 border rounded"
                                        placeholder="Enter user ID"
                                        value={newChatUserId}
                                        onChange={(e) => setNewChatUserId(e.target.value)}
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                            onClick={handleCreateChat}
                                        >
                                            Create Chat
                                        </button>
                                        <button
                                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>

                </div>
            </div>
        </>
    )
}

export default Messages