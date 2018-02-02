import React from 'react';

const Out = props => (
  <div>
    <div>{props.title}</div>
    <div>{props.owner}</div>
    <div>{props.status}</div>
  </div>
);

export default Out;
