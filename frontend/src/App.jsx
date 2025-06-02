import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header/Header";
import useDebounce from "../src/hooks/useDebounce";
import axios from "axios";
import ProductCard from "./components/ProductCard/ProductCard";
import Checkout from "./components/Checkout/Checkout";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (term = "") => {
    try {
      setLoading(true);
      const url = term.length
        ? `http://localhost:4000/api/v1/products/search?q=${term}`
        : `http://localhost:4000/api/v1/products`;

      const res = await axios.get(url);
      const fetchedData = res.data.data;
      setProducts(fetchedData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    toast.info("Product removed from cart");
  };

  const handleQuantityChange = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/sales", {
        items: cartItems,
      });
      if (response.data) {
        toast.success("Checkout successful!");
      }

      setCartItems([]);
    } catch (error) {
      toast.error("Checkout failed");
      console.error(error);
    }
  };
  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Side: Product List */}
          <div className="md:col-span-2 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <div className="space-y-4">
              {/* product card render */}
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Cart */}
          <Checkout
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onQuantityChange={handleQuantityChange}
            onCheckout={handleCheckout}
          />
          {/* <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Cart</h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} x {item.price}
                      </p>
                    </div>
                    <button className="text-red-600 hover:underline text-sm">
                      Remove
                    </button>
                  </div>
                ))}
                <div className="font-semibold pt-2">
                  Total: $
                  {cartItems.reduce(
                    (acc, item) =>
                      acc + parseFloat(item.price.slice(1)) * item.quantity,
                    0
                  )}
                </div>
              </div>
            )}
          </div> */}
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
