import React from 'react';

const NotFound = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
    }}
  >
    <i className="fas fa-exclamation-triangle fa-7x" style={{ color: 'red' }} />
    <h2>404</h2>
    <p>Not found</p>
    <p>Check your link and try again...</p>
  </div>
);

export default NotFound;
