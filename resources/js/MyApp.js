import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import Header from './components/header/Header';

import { useSelector } from 'react-redux';

function MyApp() {

  const sidebarOpen = useSelector(state => state.sidebarOpen);

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
