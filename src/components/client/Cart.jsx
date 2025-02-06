import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQuantity = (id) => {
    const item = cart.items.find((item) => item.id === id);
    dispatch(cartActions.addToCart(item));
  };

  const decreaseQuantity = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };

  const removeItem = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
      
      {cart.items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row bg-gray-50 rounded-lg shadow p-4"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                />
              </div>

              <div className="flex flex-col flex-1 md:ml-6 mt-4 md:mt-0">
                <div>
                  <h3 className=" font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 mt-1">Unit Price: ${item.price.toFixed(2)}</p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center bg-gray-200 rounded-full px-2 py-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        −
                      </button>
                      <span className="mx-3 text-lg font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-indigo-600 font-bold text-lg">
                      Total: ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-3 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
