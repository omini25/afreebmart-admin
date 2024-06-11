import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    DashboardPage,
    AdsPage,
    LoginPage, MessagesPage, OrdersPage, PaymentsHistoryPage,
    ProfilePage,
    ShopPage,
    SignupPage, ProductPage
} from "./routes/Routes.js";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {CartPreview} from "./components/CartPreview.jsx";


function App() {
    const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/" element={<LoginPage />} />
                    {/*<Route path="/product/:productName" element={<ProductPage />} />*/}
                    {/*<Route path="/shop" element={<ShopPage />} />*/}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/account/groups" element={<AdsPage />} />
                    <Route path="messages" element={<MessagesPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/payments" element={<PaymentsHistoryPage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                </Routes>
            </Router>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition: Bounce
            />

            {isCartOpen && <CartPreview setIsCartPreviewOpen={setIsCartPreviewOpen} />}
        </Provider>
    )
}

export default App;