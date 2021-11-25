import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.development';
import { request_logout } from '../../actions/authentication/authentication-actions';
import toggleSidebar from '../../actions/sidebar/toggle-sidebar';
import { toggleClass } from '../../utils/utility_functions';
import { userRoles } from '../../utils/util_structures';

function Sidebar() {
  const [sidebarOpen, user] = useSelector(state => [
    state.sidebarOpen,
    state.users.user,
  ]);

  const dispatch = useDispatch();

  const toggleReportTypes = () => {
    const reportTypes = document.querySelector('.report-types');
    if (reportTypes.classList.contains('report-types--open')) {
      toggleClass(reportTypes, 'report-types--open', 'report-types--close');
      toggleClass(
        document.querySelector('.report-arrow'),
        'report-arrow--down',
        'report-arrow--right'
      );
    } else {
      toggleClass(reportTypes, 'report-types--close', 'report-types--open');
      toggleClass(
        document.querySelector('.report-arrow'),
        'report-arrow--right',
        'report-arrow--down'
      );
    }
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
              to='/sales/add'
              className='bg-transparent text-decoration-none d-flex align-items-center'
            >
              <span className='material-icons me-1 add-icon'>add</span> New Sale
            </Link>
          </li>
          <li className='list-group-item bg-transparent py-1'>
            <Link
              to='/purchases/add'
              className='bg-transparent text-decoration-none d-flex align-items-center'
            >
              <span className='material-icons me-1 add-icon'>add</span>New
              Purchase
            </Link>
          </li>
          {user.role === userRoles.ADMIN && (
            <li className='list-group-item bg-transparent py-1'>
              <Link
                to='/products/add'
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
            className='list-group-item list-group-item-primary d-flex align-items-center'
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
            to='/products'
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
            <div
              className='report-btn list-group-item list-group-item-primary'
              onClick={toggleReportTypes}
            >
              <div className='relative-container d-flex align-items-center'>
                <span className='material-icons me-2'>description</span>
                <span className='option-text'> Reports </span>
                <span className='material-icons ms-3 report-arrow report-arrow--right'>
                  chevron_right
                </span>
              </div>
            </div>
            <ul className='report-types report-types--close ps-0 mb-0 list-group-flush bg-primary'>
              <Link
                to='/reports/sales'
                className='d-block list-group-item ps-4'
              >
                Sales Report
              </Link>
              <Link
                to='/reports/purchases'
                className='d-block list-group-item ps-4'
              >
                Purchases Report
              </Link>
            </ul>
          </div>
        </div>

        <div className='list-group list-group-flush mt-3 mb-5 sidebar__actions'>
          <Link
            to='/settings'
            className='list-group-item list-group-item-primary d-flex align-items-center'
          >
            <span className='material-icons me-2'>settings</span>
            <span className='option-text'> Settings </span>
          </Link>
          <button
            onClick={() => dispatch(request_logout())}
            className='list-group-item list-group-item-primary d-flex align-items-center'
          >
            <span className='material-icons me-2'>logout</span>
            <span className='option-text'> Logout </span>
          </button>
        </div>
      </aside>
    </Fragment>
  );
}

export default Sidebar;
