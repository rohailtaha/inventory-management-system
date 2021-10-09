function PaymentStatusBadge({ status }) {
  const getStatusBadge = () => {
    switch (status.toUpperCase()) {
      case 'PAID':
        return <span className='badge rounded-pill bg-success'>Paid</span>;
      case 'UNPAID':
        return <span className='badge rounded-pill bg-danger'>Unpaid</span>;
      case 'PARTIAL':
        return <span className='badge rounded-pill bg-info'>Partial</span>;
      default:
        return <span className='badge rounded-pill bg-success'>Paid</span>;
    }
  };

  return getStatusBadge();
}

export default PaymentStatusBadge;
