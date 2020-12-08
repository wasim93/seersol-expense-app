import React from 'react';

import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      variant='success'
      role='status'
      style={{
        width: '40px',
        height: '40px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'></span>
    </Spinner>
  );
};

export default Loader;
