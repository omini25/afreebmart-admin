import {server} from "../../server.js";
import axios from "axios";

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const FETCH_WISHLIST_STATUS = 'FETCH_WISHLIST_STATUS';

export const addToWishlist = (productId, userId) => async dispatch => {
    try {
        const response = await axios.post(`${server}/api/wishlist/user/${userId}/add`, { productId });
        dispatch({
            type: ADD_TO_WISHLIST,
            payload: response.data,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const removeFromWishlist = (productId, userId) => async dispatch => {
    try {
        const response = await axios.delete(`${server}/wishlist/user/${userId}/remove`, { data: { productId } });
        dispatch({
            type: REMOVE_FROM_WISHLIST,
            payload: productId,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const fetchWishlistStatus = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`${server}/wishlist/user/${userId}`);
        dispatch({ type: FETCH_WISHLIST_STATUS, payload: response.data });
        return response;
    } catch (error) {
        console.error(error);
    }
};