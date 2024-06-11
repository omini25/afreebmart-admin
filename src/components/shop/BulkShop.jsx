import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'

export const BulkShop = ({products}) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [filters, setFilters] = useState([]);

    const handleFilterChange = (sectionId, optionValue) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [sectionId]: prevFilters[sectionId]
                ? [...prevFilters[sectionId], optionValue]
                : [optionValue],
        }));
    };

    const filteredProducts = products.filter(product =>
        Object.entries(selectedFilters).every(([filterKey, filterValues]) =>
            filterValues.includes(product[filterKey])
        )
    );

    return (
        <>
            <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
                <div className="border-b border-gray-200 pb-10 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Main Shop</h1>
                    <p className="mt-4 text-base text-gray-500">
                        Products that can not be bought in the bulk store.
                    </p>
                </div>

                <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                    <aside>
                        <h2 className="sr-only">Filters</h2>

                        <button
                            type="button"
                            className="inline-flex items-center lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="text-sm font-medium text-gray-700">Filters</span>
                            <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
                        </button>

                        <div className="hidden lg:block">
                            <form className="space-y-10 divide-y divide-gray-200">
                                {filters.map((section, sectionIdx) => (
                                    <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                                        <fieldset>
                                            <legend
                                                className="block text-sm font-medium text-gray-900">{section.name}</legend>
                                            <div className="space-y-3 pt-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            onChange={() => handleFilterChange(section.id, option.value)}
                                                        />
                                                        <label htmlFor={`${section.id}-${optionIdx}`}
                                                               className="ml-3 text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </fieldset>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </aside>

                    <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                        <h2 id="product-heading" className="sr-only">
                            Products
                        </h2>

                        <div
                            className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                                >
                                    <div
                                        className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                                        <img
                                            src={`https://afreebmart.com/images/products/${product.image}`}
                                            alt={product.product_name}
                                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col space-y-2 p-4">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0"/>
                                                {product.product_name}
                                            </a>
                                        </h3>
                                        <p className="text-sm text-gray-500">{product.description}</p>
                                        <div className="flex flex-1 flex-col justify-end">
                                            {/*<p className="text-sm italic text-gray-500">{product.options}</p>*/}
                                            <p className="text-base font-medium text-gray-900">${product.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

// const filteredProducts = products.filter(product =>
//     Object.entries(selectedFilters).every(([filterKey, filterValues]) =>
//         filterValues.includes(product[filterKey])
//     )
// );