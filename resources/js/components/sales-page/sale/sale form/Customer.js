import React from 'react';

function Customer({name}) {
  return <option value={name}>{name}</option>;
}

export default Customer;
