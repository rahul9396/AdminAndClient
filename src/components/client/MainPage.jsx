import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MainPage() {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  const goToCartPage = () => {
    navigate("cart");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Ekart</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
              <Link
                to="/admin"
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                style={{ textDecoration: "none" }}
              >
                Admin Panel
              </Link>
              <Link
                to="#"
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
                style={{ textDecoration: "none" }}
              >
                About
              </Link>
              <button
                onClick={goToCartPage}
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <footer className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm">
            {new Date().getFullYear()} Ekart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
