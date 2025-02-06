import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from 'react-redux';
import { Suspense, lazy } from 'react';
import store from './store/store';

const Layout = lazy(() => import("./components/admin/AdminDash"));
const Home = lazy(() => import("./pages/admin/Dashboard"));
const Product = lazy(() => import("./pages/admin/Product"));
const ProductEdit = lazy(() => import("./pages/admin/ProductEdit"));
const MainPage = lazy(() => import("./components/client/MainPage"));
const Main = lazy(() => import("./pages/Main"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const CartPage = lazy(() => import("./components/client/CartPage"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/admin" element={<Layout><Outlet /></Layout>}>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:id" element={<ProductEdit />} />
            </Route>
            <Route path="/" element={<MainPage />}>
              <Route index element={<Main />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
