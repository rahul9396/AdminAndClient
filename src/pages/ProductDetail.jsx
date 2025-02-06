import { useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice';

export default function ProductDetail() {
    const { path } = useLocation();
    const { id } = useParams();
    const { data, loading, error } = useApi('products', id);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);

    const handleAddToCart = () => {
        dispatch(cartActions.addToCart({
            id: data.id,
            name: data.title,
            price: data.price,
            image: data.image
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <p className="text-red-500 text-lg">Something Went Wrong</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    <div className="flex flex-col">
                        <div className="bg-white rounded-lg p-8 shadow-lg">
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                                <img
                                    src={data?.image}
                                    alt={data?.title}
                                    className="h-[400px] w-full object-contain object-center hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {data?.title}
                            </h1>
                            
                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mt-4">
                                    {data?.category?.charAt(0)?.toUpperCase() + data?.category?.slice(1)}
                                </span>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, index) => (
                                            <svg
                                                key={index}
                                                className={`h-5 w-5 ${
                                                    index < Math.floor(data?.rating?.rate)
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="ml-3 text-sm text-gray-500">
                                        {data?.rating?.rate} out of 5 stars ({data?.rating?.count} reviews)
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <p className="text-3xl text-gray-900 font-bold">
                                        ${data?.price?.toFixed(2)}
                                    </p>
                                    {data?.price >= 50 && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                            Free Shipping
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                                <div className="mt-3">
                                    <p className="text-base text-gray-700 leading-relaxed">
                                        {data?.description}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}