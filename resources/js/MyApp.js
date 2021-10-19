import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Header from './components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetch_products } from './actions/products/products-actions';
import { request_fetch_suppliers } from './actions/suppliers/suppliers-actions';

function MyApp() {
  const [sidebarOpen, fetchedProducts, fetchedSuppliers] = useSelector(
    state => [
      state.sidebarOpen,
      state.products.fetched,
      state.suppliers.fetched,
    ]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_products());
    dispatch(request_fetch_suppliers());
  }, []);

  return (
    <Router>
      <Header />
      <Sidebar />
      <main className={`main ${sidebarOpen ? '' : 'main--expanded'} py-5`}>
        {fetchedProducts && fetchedSuppliers && <AppRouter />}
      </main>
    </Router>
  );
}

export default MyApp;
