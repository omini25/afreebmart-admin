// import {Fragment, useEffect, useState} from 'react'
// import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import {useDispatch, useSelector} from 'react-redux';
// import { removeFromCart, updateQuantity } from '../redux/actions/actions.js';

export const CartPreview = ({ setIsCartPreviewOpen }) => {
    // const [open, setOpen] = useState(true)
    // const cartItems = useSelector((state) => state.cart.cart);
    // const dispatch = useDispatch();
    //
    // useEffect(() => {
    //     setIsCartPreviewOpen(true);
    //     return () => setIsCartPreviewOpen(false);
    // }, []);
    //
    // const handleClose = () => {
    //     // Other code to close the CartPreview component...
    //     setIsCartPreviewOpen(false); // Set isCartPreviewOpen to false when CartPreview is closed
    //     setOpen(false); // Also set open to false
    // };
    //
    // const handleRemove = (product) => {
    //     dispatch(removeFromCart(product));
    //     console.log(product, 'removed from cart');
    // };
    //
    // const handleQuantityChange = (product, quantity) => {
    //     if (quantity === 0) {
    //         dispatch(removeFromCart(product)); // Remove the product if the quantity is 0
    //     } else {
    //         dispatch(updateQuantity(product, quantity)); // Otherwise, update the quantity
    //     }
    // };

    return (
        // <Transition show={open}>
        //     <Dialog className="relative z-10" onClose={setOpen}>
        //         <TransitionChild
        //             enter="ease-in-out duration-500"
        //             enterFrom="opacity-0"
        //             enterTo="opacity-100"
        //             leave="ease-in-out duration-500"
        //             leaveFrom="opacity-100"
        //             leaveTo="opacity-0"
        //         >
        //             <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        //         </TransitionChild>
        //
        //         <div className="fixed inset-0 overflow-hidden">
        //             <div className="absolute inset-0 overflow-hidden">
        //                 <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        //                     <TransitionChild
        //                         enter="transform transition ease-in-out duration-500 sm:duration-700"
        //                         enterFrom="translate-x-full"
        //                         enterTo="translate-x-0"
        //                         leave="transform transition ease-in-out duration-500 sm:duration-700"
        //                         leaveFrom="translate-x-0"
        //                         leaveTo="translate-x-full"
        //                     >
        //                         <DialogPanel className="pointer-events-auto w-screen max-w-md">
        //                             <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        //                                 <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        //                                     <div className="flex items-start justify-between">
        //                                         <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
        //                                         <div className="ml-3 flex h-7 items-center">
        //                                             <button
        //                                                 type="button"
        //                                                 className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
        //                                                 onClick={handleClose}
        //                                             >
        //                                                 <span className="absolute -inset-0.5" />
        //                                                 <span className="sr-only">Close panel</span>
        //                                                 <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        //                                             </button>
        //                                         </div>
        //                                     </div>
        //
        //                                     <div className="mt-8">
        //                                         <div className="flow-root">
        //                                             <ul role="list" className="-my-6 divide-y divide-gray-200">
        //                                                 {cartItems.map((product, index) => (
        //                                                     <li key={index} className="flex py-6">
        //                                                         <div
        //                                                             className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        //                                                             <img
        //                                                                 src={`https://afreebmart.com/images/products/${product.image}`}
        //                                                                 alt={product.product_name}
        //                                                                 className="h-full w-full object-cover object-center"
        //                                                             />
        //                                                         </div>
        //
        //                                                         <div className="ml-4 flex flex-1 flex-col">
        //                                                             <div>
        //                                                                 <div
        //                                                                     className="flex justify-between text-base font-medium text-gray-900">
        //                                                                     <h3>
        //                                                                         <a href={product.href}>{product.product_name}</a>
        //                                                                     </h3>
        //                                                                     <p className="ml-4">{product.price}</p>
        //                                                                 </div>
        //                                                                 <div className="flex items-center space-x-2">
        //                                                                     <button
        //                                                                         className="px-2 py-1 bg-gray-200 rounded"
        //                                                                         onClick={() => handleQuantityChange(product, product.quantity - 1)}
        //                                                                     >
        //                                                                         -
        //                                                                     </button>
        //                                                                     <input
        //                                                                         className="w-12 text-center"
        //                                                                         type="number"
        //                                                                         min="0"
        //                                                                         value={product.quantity}
        //                                                                         onChange={(e) => handleQuantityChange(product, Number(e.target.value))}
        //                                                                     />
        //                                                                     <button
        //                                                                         className="px-2 py-1 bg-gray-200 rounded"
        //                                                                         onClick={() => handleQuantityChange(product, product.quantity + 1)}
        //                                                                     >
        //                                                                         +
        //                                                                     </button>
        //                                                                 </div>
        //                                                             </div>
        //                                                             <div
        //                                                                 className="flex flex-1 items-end justify-between text-sm">
        //                                                                 {product.quantity < 1 ? <p className="text-red-500">Product out of stock</p> : null}
        //
        //                                                                 <div className="flex">
        //                                                                     <button
        //                                                                         type="button"
        //                                                                         className="font-medium text-indigo-600 hover:text-indigo-500"
        //                                                                         onClick={() => handleRemove(product)} // Call handleRemove when the button is clicked
        //                                                                     >
        //                                                                         Remove
        //                                                                     </button>
        //                                                                 </div>
        //                                                             </div>
        //                                                         </div>
        //                                                     </li>
        //                                                 ))}
        //                                             </ul>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //
        //                                 <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        //                                     <div className="flex justify-between text-base font-medium text-gray-900">
        //                                         <p>Subtotal</p>
        //                                         <p>$262.00</p>
        //                                     </div>
        //                                     <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at
        //                                         checkout.</p>
        //                                     <div className="mt-6">
        //                                         <a
        //                                             href="#"
        //                                             className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary"
        //                                         >
        //                                             Checkout
        //                                         </a>
        //                                     </div>
        //                                     <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        //                                         <p>
        //                                             or{' '}
        //                                             <button
        //                                                 type="button"
        //                                                 className="font-medium text-secondary hover:text-primary"
        //                                                 onClick={() => setOpen(false)}
        //                                             >
        //                                                 Continue Shopping
        //                                                 <span aria-hidden="true"> &rarr;</span>
        //                                             </button>
        //                                         </p>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </DialogPanel>
        //                     </TransitionChild>
        //                 </div>
        //             </div>
        //         </div>
        //     </Dialog>
        // </Transition>
        <>
        </>
    )
}