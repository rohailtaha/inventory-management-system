import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className='main--login'>
      <div className='main__content'>
        <h1 className='mb-4'> Login </h1>
        <LoginForm />
      </div>
    </div>
  );
}
