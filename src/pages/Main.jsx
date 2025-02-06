import { useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";
import Product from "./Product";
import Carousel from "../components/client/Carousel";

export default function Main() {
    const { data, loading, error } = useApi("products");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (data) {
            const uniqueCategories = [...new Set(data.map(item => item.category))];
            setCategories(uniqueCategories);
        }
    }, [data]);

    const filteredAndSortedProducts = data
        ?.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        ?.sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "rating":
                    return b.rating.rate - a.rating.rate;
                default:
                    return 0;
            }
        });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse max-w-7xl mx-auto">
                    <div className="h-[400px] bg-gray-200 rounded-xl mb-8"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600">We're having trouble loading the products. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mb-8">
                <Carousel />
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm mb-8 p-6 sm:p-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Welcome to Our Store
                    </h1>
                    <p className="text-gray-600 text-lg max-w-5xl">
                        Discover our curated collection of products. From fashion to electronics, 
                        find everything you need at great prices.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <svg
                                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full py-2 pl-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full py-2 pl-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="default">Sort by</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Best Rating</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-end text-gray-600">
                            {filteredAndSortedProducts?.length} products found
                        </div>
                    </div>
                </div>

                {filteredAndSortedProducts?.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAndSortedProducts?.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}