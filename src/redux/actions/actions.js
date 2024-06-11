import {
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../types.js';
import {toast} from "react-toastify";
import axios from "axios";
import {server} from "../../server.js";


export const signup = (name, email, password) => {
    return async (dispatch) => {
        dispatch({ type: SIGNUP_REQUEST });
        try {
            const response = await fetch(`${server}/vendor-register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.status >= 200 && response.status < 300) {
                throw new Error('Signup failed. Please try again.');
            }

            const data = await response.json();

            // Save user's details in Redux store
            dispatch({ type: SIGNUP_SUCCESS, payload: data });

            // Save user's details and isLoggedIn state in localStorage
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', true);

            // Display the toast message here, after the signup request is successful
            toast.success('Signup successful!');
        } catch (error) {
            dispatch({ type: SIGNUP_FAILURE, payload: error.message });
            // Display the toast message here, if the signup request fails
            toast.error('Signup failed. Please try again.');
        }
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await axios.post(`${server}/login`, { email, password });

            if (response.status < 200 || response.status >= 300) {
                throw new Error('Login failed. Please try again.');
            }

            const data = response.data;

            // Check if the user's role is 'vendor'
            if (data.user.role !== 'vendor') {
                throw new Error('Access denied. You must be a vendor to log in.');
            }

            // Save user's details in Redux store
            dispatch({ type: LOGIN_SUCCESS, payload: data });

            // Save user's details and isLoggedIn state in localStorage
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', true);

            // Display the toast message here, after the login request is successful
            toast.success('Login successful!');
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error.message });
            // Display the toast message here, if the login request fails
            toast.error(error.message);
            return error;
        }
    };
};

export const LOGOUT = 'LOGOUT';

export const logout = () => {
    // Clear user's details and isLoggedIn state from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');

    return { type: LOGOUT };
};