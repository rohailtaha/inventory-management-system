import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.development';
import { logout } from '../../actions/authentication/authentication';
import toggleSidebar from '../../actions/sidebar/toggle-sidebar';
import { resetUser } from '../../actions/user/user-actions';
import { userRoles } from '../../utils/util_structures';

function Sidebar() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(state => state.sidebarOpen);
  const user = useSelector(state => state.user);

  const handleLogout = event => {
    event.preventDefault();
    axios
      .get('/logout')
      .then(res => {
        dispatch(logout());
        dispatch(resetUser());
      })
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <div
        className={`sidebar-bg ${
          sidebarOpen ? 'sidebar-bg--open' : 'sidebar-bg--close'
        } bg-primary`}
      >
        {' '}
      </div>

      <aside
        className={`sidebar ${
          sidebarOpen ? 'sidebar--open' : 'sidebar--close'
        } bg-primary py-5`}
        id='sidebar'
      >
        <button
          className='p-2 btn menu-btn d-flex justify-content-center'
          onClick={() => dispatch(toggleSidebar(sidebarOpen))}
        >
          <i className='fas fa-bars'></i>
        </button>

        <ul className='list-group list-group-flush sidebar__quick-actions mt-4'>
          <li className='list-group-item bg-transparent py-1'>
            <Link
              to='/add_sale'
              className='bg-transparent text-decoration-none'
            >
              <i className='fas fa-plus me-2'></i> New Sale
            </Link>
          </li>
          <li className='list-group-item bg-transparent py-1'>
            <Link
              to='/add_purchase'
              className='bg-transparent text-decoration-none'
            >
              <i className='fas fa-plus me-2'></i>New Purchase
            </Link>
          </li>
          <li className='list-group-item bg-transparent py-1'>
            <Link
              to='/add_product'
              className='bg-transparent text-decoration-none'
            >
              <i className='fas fa-plus me-2'></i>New Product
            </Link>
          </li>
        </ul>

        <div className='list-group list-group-flush mt-3'>
          <Link
            to='/'
            className='list-group-item list-group-item-primary active'
          >
            <i className='fas fa-chart-pie me-2'></i> <span> Dashboard </span>
          </Link>

          {user.role === userRoles.ADMIN && (
            <Link
              to='/users'
              className='list-group-item list-group-item-primary'
            >
              <i className='fas fa-user-tie me-2'></i>
              <span> Users </span>
            </Link>
          )}

          <Link
            to='/inventory'
            className='list-group-item list-group-item-primary'
          >
            <i className='fas fa-dolly-flatbed me-2'></i>{' '}
            <span> Inventory</span>
          </Link>
          <Link
            to='/categories'
            className='list-group-item list-group-item-primary'
          >
            <i className='fas fa-tags me-2'></i> <span> Categories </span>
          </Link>
          <Link
            to='/suppliers'
            className='list-group-item list-group-item-primary'
          >
            <i className='fas fa-truck me-2'></i> <span> Suppliers </span>
          </Link>
          <Link
            to='/purchases'
            className='list-group-item list-group-item-primary'
          >
            <i className='fas fa-shopping-cart me-2'></i>{' '}
            <span> Purchases </span>
          </Link>
          <Link
            to='/customers'
            className='list-group-item list-group-item-primary'
          >
            <i className='fas fa-user-friends me-2'></i>{' '}
            <span> Customers </span>
          </Link>
          <Link to='/sales' className='list-group-item list-group-item-primary'>
            <i className='fas fa-signal me-2'></i> <span> Sales </span>
          </Link>
          <div className='report-btn list-group-item list-group-item-primary'>
            <div className='relative-container'>
              <i className='fas fa-file-invoice me-2'></i>{' '}
              <span> Reports </span>
              <i className='fas fa-angle-right report-arrow report-arrow--right'></i>
            </div>
          </div>
          <ul className='report-types report-types--open ps-0 mb-0 list-group-flush bg-primary'>
            <Link to='/sales_report' className='d-block list-group-item'>
              Sales Report
            </Link>
            <Link to='/purchases_report' className='d-block list-group-item'>
              Purchases Report
            </Link>
          </ul>
        </div>
        <div className='list-group list-group-flush mt-3 mb-5'>
          <a
            href='settings.html'
            className='list-group-item list-group-item-primary'
          >
            <i className='fas fa-wrench me-2'></i> <span> Settings </span>
          </a>
          <a
            onClick={handleLogout}
            href='/api/logout'
            className='list-group-item list-group-item-primary'
          >
            <i className='fas fa-sign-out-alt me-2'></i> <span> Logout </span>
          </a>
        </div>
      </aside>
    </Fragment>
  );
}

export default Sidebar;
