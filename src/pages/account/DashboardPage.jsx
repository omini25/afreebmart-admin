import Dashboard from '../../components/dashboard/Dashboard';
import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";


export const DashboardPage = () => {
    // const [active, setActive] = useState(1);
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')); // Access the isLoggedIn state from the local storage // Access the isLoggedIn state from the Redux store
    const navigate = useNavigate(); // Hook from react-router-dom for navigation

    // Redirect to login page if user is not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            toast.error('Please login to access profile page.');
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <>
            {/*<Header />*/}
            {/*<div className={`mt-96`}>*/}
                <Dashboard />
            {/*</div>*/}

        </>
    );
};