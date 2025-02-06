import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cartSlice';

export default function Product({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(cartActions.addToCart({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.image
        }));
    };

    return (
        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
            <Link to={`/product/${product.id}`} className="block w-full h-64 p-4 bg-white relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
                    <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="relative w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                        onLoad={(e) => {
                            const placeholder = e.target.previousElementSibling;
                            if (placeholder) placeholder.remove();
                        }}
                    />
                </div>
            </Link>

            <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
                <div className="mb-2 flex items-start justify-between gap-2">
                    <Link
                        to={`/product/${product.id}`}
                        className="text-sm font-medium text-gray-800 hover:text-indigo-600 line-clamp-2 flex-1 transition-colors duration-200"
                    >
                        {product.title}
                    </Link>
                    <span className="inline-flex px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium whitespace-nowrap">
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                className={`w-4 h-4 ${index < Math.floor(product.rating.rate)
                                        ? "text-yellow-400"
                                        : "text-gray-200"
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">
                        ({product.rating.count})
                    </span>
                </div>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-lg font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                        </div>
                        {product.price >= 50 && (
                            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                                Free Shipping
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg transition-colors duration-200 font-medium text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        rating: PropTypes.shape({
            rate: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
        }).isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};