import { LOGOUT } from './actions/actions.js';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    LOAD_CART,
    UPDATE_QUANTITY,
    decreaseQuantity,
    DECREASE_QUANTITY
} from './actions/cartActions.js';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

const cartFromLocalStorage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const isLoggedInFromLocalStorage = localStorage.getItem('isLoggedIn')
    ? JSON.parse(localStorage.getItem('isLoggedIn'))
    : false;


const initialState = {
    loading: false,
    user: null,
    isLoggedIn: false,
    accessToken: null,
    error: null,
    cart: cartFromLocalStorage
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cart.find(x => x.id === item.id);

            if (existItem) {
                return {
                    ...state,
                    cart: state.cart.map(x => x.id === existItem.id ? { ...x, qty: x.qty + 1 } : x)
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, item]
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(product => product.id !== action.payload.id)
            };
        case LOAD_CART:
            return {
                ...state,
                cart: action.payload
            };
        case UPDATE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(product =>
                    product.id === action.payload.product.id
                        ? { ...product, quantity: action.payload.quantity }
                        : product
                ),
            };
        case DECREASE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(product =>
                    product.id === action.payload.product.id
                        ? { ...product, qty: action.payload.qty }
                        : product
                ),
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
            };
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, accessToken: action.payload.access_token,  isLoggedIn: isLoggedInFromLocalStorage };
        case SIGNUP_FAILURE:
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload, isLoggedIn: false };
        default:
            return state;
    }
};

export default userReducer;