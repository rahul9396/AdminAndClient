import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { cartActions } from "../../store/cartSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert("Checkout successful!\n" + JSON.stringify(userDetails, null, 2));
    dispatch(cartActions.clearCart());
    setUserDetails({
        name: "",
        email: "",
        address: "",
        phone: "",
    })
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Checkout
        </h1>
        <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col md:flex-row gap-6">
          <div
            className="md:w-2/3 p-6 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto"
            style={{ maxHeight: "70vh" }}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Your Cart ({cart.totalQuantity} items)
            </h2>
            <Cart />
          </div>

          <div className="md:w-1/3 p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your Details
            </h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  rows="3"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-indigo-500"
                  required
                ></textarea>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-gray-800">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-indigo-600">
                    ${cart.totalAmount.toFixed(2)}
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                  Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
