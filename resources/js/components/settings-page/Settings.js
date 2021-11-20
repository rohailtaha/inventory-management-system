import AccountForm from './settings-forms/AccountForm';
import PasswordForm from './settings-forms/PasswordForm';
import ShopForm from './settings-forms/ShopForm';

export default function Settings() {
  return (
    <div className='main__content main__content--settings'>
      <div className='forms-container'>
        <section>
          <h2 className='mb-3'> Account Settings </h2>
          <AccountForm />
          <PasswordForm />
        </section>
        <section>
          <h2 className='mb-3'> Shop Settings </h2>
          <ShopForm />
        </section>
      </div>
    </div>
  );
}
