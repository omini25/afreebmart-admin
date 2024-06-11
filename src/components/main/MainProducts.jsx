import {EyeIcon, HeartIcon, ShoppingCartIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {server} from "../../server.js";
import axios from 'axios';
import {ProductOverview} from "../products/ProductOverview.jsx";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlistActions';

export const MainProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Product has been added to cart');
    };

    useEffect(() => {
        axios.get(`${server}/products`)
            .then(response => setProducts(response.data.products))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleEyeClick = (product) => {
        setSelectedProduct(product);
        setIsOpen(true); // set isOpen to true when a product is selected
        console.log('selectedProduct after click:', product);
    };

    const handleClose = () => {
        setSelectedProduct(null);
        setIsOpen(false); // set isOpen to false when the product overview is closed
    };


    const wishlist = useSelector(state => state.wishlist);
    const user = useSelector(state => state.user);

    const handleHeartClick = (product) => {
        if (!user || !user.isLoggedIn) {
            toast.error('You must be logged in to add products to wishlist');
            return;
        }

        if (!wishlist || wishlist.find(item => item.id === product.id)) {
            toast.info('Product is already in wishlist');
            return;
        }

        dispatch(addToWishlist(product, user.id));
        toast.success('Product has been added to wishlist');
    };




    return (
        <>

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-xl font-bold text-gray-900">Main Products</h2>

                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product, index) => (
                            <div key={index}>
                                <div className="relative">
                                    <div className="relative h-72 w-full overflow-hidden rounded-lg ">
                                        <div className="absolute z-10 top-2 left-2 flex flex-col space-y-2">
                                            <EyeIcon onClick={() => handleEyeClick(product)}
                                                     className="h-8 w-8 text-primary cursor-pointer"
                                                     aria-hidden="true"
                                            />
                                            <HeartIcon
                                                onClick={() => handleHeartClick(product)}
                                                className={`h-8 w-8 ${wishlist && wishlist.find(item => item.id === product.id) ? 'text-secondary' : 'text-primary'}`}
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <img
                                            src={`https://afreebmart.com/images/products/${product.image}`}
                                            alt={product.product_name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="relative mt-4">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            <Link to={`/product/${product.product_name}`}>
                                                {product.product_name}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <div
                                        className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                        />
                                        <p className="relative text-lg font-semibold text-primary">${product.price}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <a
                                        href="javascript:void(0)"
                                        onClick={() => product.group !== 1 && handleAddToCart(product)}
                                        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                                    >
                                        {product.group === 1 ? "Create or Join Group" : "Add to Cart"}
                                        {product.group === 1 ?
                                            <PeopleIcon className="h-5 w-5 ml-2" aria-hidden="true"/> :
                                            <ShoppingCartIcon className="h-5 w-5 ml-2" aria-hidden="true"/>
                                        }
                                        <span className="sr-only">, {product.name}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedProduct && <ProductOverview product={selectedProduct} onClose={handleClose} open={isOpen}/>}
        </>
    )
}