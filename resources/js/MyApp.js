import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Header from './components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetch_products } from './actions/products/products-actions';

function MyApp() {
  const sidebarOpen = useSelector(state => state.sidebarOpen);
  const fetched = useSelector(state => state.products.fetched);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!fetched) {
      dispatch(fetch_products());
    }
  }, []);

  return (
    <Router>
      <Header />
      <Sidebar />
      <main className={`main ${sidebarOpen ? '' : 'main--expanded'} py-5`}>
        <AppRouter />
      </main>
    </Router>
  );
}

export default MyApp;
