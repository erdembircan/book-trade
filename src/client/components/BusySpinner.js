import React from 'react';

const BusySpinner = ({ isBusy }) => (
  <div className="busyBar" style={{ visibility: isBusy ? 'visible' : 'hidden' }}>
    <i className="fa fa-spinner fa-2x" aria-hidden="true" />
  </div>
);

export default BusySpinner;
