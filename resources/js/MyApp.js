import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Header from './components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DeleteConfirmationModal from './components/common/delete-confirmation-modal/DeleteConfirmationModal';
import SuccessModal from './components/common/success-modal/SuccessModal';
import { request_fetch_shop } from './actions/shop/shop-actions';

function MyApp() {
  const [sidebarOpen, deleteConfirmation, successMessage] = useSelector(
    state => [
      state.sidebarOpen,
      state.suppliers.fetched,
      state.customers.fetched,
      state.categories.fetched,
      state.deleteConfirmation,
      state.successMessage,
    ]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(request_fetch_shop());
  }, []);

  return (
    <Router>
      <Header />
      <Sidebar />
      <main className={`main ${sidebarOpen ? '' : 'main--expanded'} py-5`}>
        <AppRouter />
      </main>
      {deleteConfirmation.show && <DeleteConfirmationModal />}
      {successMessage.show && <SuccessModal msg={successMessage.text} />}
    </Router>
  );
}

export default MyApp;
