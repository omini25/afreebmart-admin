import {Header} from "../components/layouts/Header.jsx";
import {Hero} from "../components/main/Hero.jsx";
import Banner from "../components/main/Banner.jsx";
import {FeaturedProducts} from "../components/main/FeaturedProducts.jsx";
import {MainProducts} from "../components/main/MainProducts.jsx";
import {BulkProducts} from "../components/main/BulkProducts.jsx";
import {BulkHighlight} from "../components/main/BulkHighlight.jsx";
import {Footer} from "../components/layouts/Footer.jsx";

export const HomePage = () => {
    return (
        <>
        <Header />
        <Hero />
            {/*<br />*/}
            {/*<br />*/}
        {/*<Banner />*/}
            <br />
            <FeaturedProducts />
            <MainProducts />
            <br />
            <BulkHighlight />
            {/*<BulkProducts />*/}
            <Footer />

        </>
    )
}