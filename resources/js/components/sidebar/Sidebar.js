import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.development';
import { logout } from '../../actions/authentication/authentication';
import toggleSidebar from '../../actions/sidebar/toggle-sidebar';
import { reset_user } from '../../actions/users/users-actions';
import { userRoles } from '../../utils/util_structures';

function Sidebar() {
  const dispatch = useDispatch();
  const [sidebarOpen, user] = useSelector(state => [
    state.sidebarOpen,
    state.users.user,
  ]);

  const handleLogout = event => {
    event.preventDefault();
    axios
      .get('/logout')
      .then(res => {
        dispatch(logout());
        dispatch(reset_user());
      })
      .catch(err => console.log(err));
  };

  return (
    <Fragment>
      <div
        className={`sidebar-bg ${
          sidebarOpen ? 'sidebar-bg--open' : 'sidebar-bg--close'
        } bg-primary`}
      ></div>

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
          <span className='material-icons text-white'>menu</span>
        </button>

        <ul className='list-group list-group-flush sidebar__quick-actions mt-4'>
          <li className='list-group-item bg-transparent py-1'>
            <Link
              to='/add-sale'
              className='bg-transparent text-decoration-none d-flex align-items-center'
            >
              <span className='material-icons me-1 add-icon'>add</span> New Sale
            </Link>
          </li>
          <li className='list-group-item bg-transparent py-1'>
            <Link
              to='/add-purchase'
              className='bg-transparent text-decoration-none d-flex align-items-center'
            >
              <span className='material-icons me-1 add-icon'>add</span>New
              Purchase
            </Link>
          </li>
          {user.role === userRoles.ADMIN && (
            <li className='list-group-item bg-transparent py-1'>
              <Link
                to='/add-product'
                className='bg-transparent text-decoration-none d-flex align-items-center'
              >
                <span className='material-icons me-1 add-icon'>add</span>New
                Product
              </Link>
            </li>
          )}
        </ul>

        <div className='list-group list-group-flush mt-3 sidebar__actions'>
          <Link
            to='/'
            className='list-group-item list-group-item-primary active d-flex align-items-center'
          >
            <span className='material-icons me-2'>data_usage</span>
            <span className='option-text'> Dashboard </span>
          </Link>

          {user.role === userRoles.ADMIN && (
            <Link
              to='/users'
              className='list-group-item list-group-item-primary d-flex align-items-center'
            >
              <span className='material-icons me-2'>manage_accounts</span>
              <span className='option-text'> Users </span>
            </Link>
          )}

          <Link
            to='/inventory'
            className='list-group-item list-group-item-primary d-flex align-items-center'
          >
            <span className='material-icons me-2'>inventory</span>
            <span className='option-text'> Inventory</span>
          </Link>

          {user.role === userRoles.ADMIN && (
            <Link
              to='/categories'
              className='list-group-item list-group-item-primary d-flex align-items-center'
            >
              <span className='material-icons me-2'>category</span>
              <span className='option-text'> Categories </span>
            </Link>
          )}

          <Link
            to='/purchases'
            className='list-group-item list-group-item-primary d-flex align-items-center'
          >
            <span className='material-icons me-2'>shopping_bag</span>

            <span className='option-text'> Purchases </span>
          </Link>

          <Link
            to='/sales'
            className='list-group-item list-group-item-primary d-flex align-items-center'
          >
            <span className='material-icons me-2'>shopping_cart</span>
            <span className='option-text'> Sales </span>
          </Link>

          {user.role === userRoles.ADMIN && (
            <Fragment>
              <Link
                to='/suppliers'
                className='list-group-item list-group-item-primary d-flex align-items-center'
              >
                <span className='material-icons me-2'>local_shipping</span>
                <span className='option-text'> Suppliers </span>
              </Link>
              <Link
                to='/customers'
                className='list-group-item list-group-item-primary d-flex align-items-center'
              >
                <span className='material-icons me-2'>people</span>
                <span className='option-text'> Customers </span>
              </Link>
            </Fragment>
          )}

          <div className='sidebar__reports'>
            <div className='report-btn list-group-item list-group-item-primary'>
              <div className='relative-container d-flex align-items-center'>
                <span className='material-icons me-2'>description</span>
                <span className='option-text'> Reports </span>
                <span className='material-icons me-2 report-arrow report-arrow--right'>
                  chevron_right
                </span>
                {/* <span className='material-icons me-2 report-arrow report-arrow--down'>
                keyboard_arrow_down
              </span> */}
              </div>
            </div>
            <ul className='report-types report-types--open ps-0 mb-0 list-group-flush bg-primary'>
              <Link to='/sales-report' className='d-block list-group-item'>
                Sales Report
              </Link>
              <Link to='/purchases-report' className='d-block list-group-item'>
                Purchases Report
              </Link>
            </ul>
          </div>
        </div>

        <div className='list-group list-group-flush mt-3 mb-5 sidebar__actions'>
          <a
            href='settings.html'
            className='list-group-item list-group-item-primary d-flex align-items-center'
          >
            <span className='material-icons me-2'>settings</span>
            <span className='option-text'> Settings </span>
          </a>
          <a
            onClick={handleLogout}
            href='/logout'
            className='list-group-item list-group-item-primary d-flex align-items-center'
          >
            <span className='material-icons me-2'>logout</span>
            <span className='option-text'> Logout </span>
          </a>
        </div>
      </aside>
    </Fragment>
  );
}

export default Sidebar;
