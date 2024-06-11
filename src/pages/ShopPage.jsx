import React, { useEffect, useState } from 'react';
import { Shop } from "../components/shop/Shop.jsx";
import {server} from "../server.js";
import axios from 'axios';
import {Header} from "../components/layouts/Header.jsx";

export const ShopPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${server}/products`)
            .then(response => setProducts(response.data.products))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
            <Header />
            <Shop products={products} />
        </>
    )
}