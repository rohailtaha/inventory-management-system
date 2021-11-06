import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Header from './components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetch_products } from './actions/products/products-actions';
import { request_fetch_suppliers } from './actions/suppliers/suppliers-actions';
import { request_fetch_customers } from './actions/customers/customers-actions';
import DeleteConfirmationModal from './components/common/delete-confirmation-modal/DeleteConfirmationModal';
import SuccessModal from './components/common/success-modal/SuccessModal';

function MyApp() {
  const [
    sidebarOpen,
    fetchedProducts,
    fetchedSuppliers,
    fetchedCustomers,
    deleteConfirmation,
    successMessage,
  ] = useSelector(state => [
    state.sidebarOpen,
    state.products.fetched,
    state.suppliers.fetched,
    state.customers.fetched,
    state.deleteConfirmation,
    state.successMessage,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_products());
    dispatch(request_fetch_suppliers());
    dispatch(request_fetch_customers());
  }, []);

  return (
    <Router>
      <Header />
      <Sidebar />
      <main className={`main ${sidebarOpen ? '' : 'main--expanded'} py-5`}>
        {fetchedProducts && fetchedSuppliers && fetchedCustomers && (
          <AppRouter />
        )}
      </main>
      {deleteConfirmation.show && <DeleteConfirmationModal />}
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
    </Router>
  );
}

export default MyApp;
