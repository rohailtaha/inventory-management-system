import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='ms-5'>
      <h1>Page Not Found!</h1>
      <Link to='/' className='btn btn-primary btn-lg mt-3'>
        Back to Dashboard
      </Link>
    </div>
  );
}
