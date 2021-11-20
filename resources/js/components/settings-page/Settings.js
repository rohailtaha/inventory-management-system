import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { userRoles } from '../../utils/util_structures';
import AccountForm from './settings-forms/AccountForm';
import PasswordForm from './settings-forms/PasswordForm';
import ShopForm from './settings-forms/ShopForm';

export default function Settings() {
  const [userRole] = useSelector(state => [state.users.user.role]);

  return (
    <div className='main__content main__content--settings'>
      <div className='forms-container'>
        <section>
          {userRole === userRoles.ADMIN && (
            <Fragment>
              <h2 className='mb-3'> Account Settings </h2>
              <AccountForm />
            </Fragment>
          )}
          <PasswordForm />
        </section>
        {userRole === userRoles.ADMIN && (
          <section>
            <h2 className='mb-3'> Shop Settings </h2>
            <ShopForm />
          </section>
        )}
      </div>
    </div>
  );
}
