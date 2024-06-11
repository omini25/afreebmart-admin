export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product, qty = 1) => (dispatch, getState) => {
    dispatch({
        type: 'ADD_TO_CART',
        payload: {
            ...product,
            qty
        }
    });

    // Save the current state of the cart to local storage
    const state = getState();
    localStorage.setItem('cart', JSON.stringify(state.cart));
};

export const LOAD_CART = 'LOAD_CART';

export const loadCart = (cartItems) => ({
    type: LOAD_CART,
    payload: cartItems,
});


export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const updateQuantity = (product) => ({
    type: UPDATE_QUANTITY,
    payload: { product, quantity: product.qty + 1 },
});

export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const decreaseQuantity = (product) => ({
    type: DECREASE_QUANTITY,
    payload: { product, quantity: product.qty > 1 ? product.qty - 1 : 1 },
});