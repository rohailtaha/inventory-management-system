import React from 'react';
import EmailForm from './EmailForm';

export default function ForgotPasswordPage() {
  return (
    <div className='main--forgot-password'>
      <div className='main__content'>
        <h5 className='mb-4'>
          {' '}
          Don't Worry. We'll help you reset your password.{' '}
        </h5>
        <EmailForm />
      </div>
    </div>
  );
}
