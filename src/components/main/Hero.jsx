export const Hero = () => {
    return (
        <>

            <section
                className="relative bg-[url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-1/2 lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
                            Your Go-To for

                            <strong className="block font-extrabold text-primary"> Fast and Fresh Groceries </strong>
                        </h1>

                        <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white">
                            Better ingredients, better food, and beverages, at low prices
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="/shop"
                                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-secondary sm:w-auto"
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}