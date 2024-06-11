import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {ProductDetails} from "../components/products/ProductDetails.jsx";
import {server} from "../server.js";
import {Header} from "../components/layouts/Header.jsx";

export const ProductPage = () => {
    const { productName } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${server}/product/${productName}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error('Failed to fetch product', error);
            }
        };

        fetchProduct();
    }, [productName]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <ProductDetails product={product} />
        </>

    );
}