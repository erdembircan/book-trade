import React from 'react';

const In = props => (
  <table style={{ width: '100%' }}>
    <thead>
      <tr>
        <th>Requester</th>
        <th>Book</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {props.requests &&
        props.requests.map(req => (
          <tr key={req._id}>
            <td>{req.requester}</td>
            <td>{req.bookTitle}</td>
            <td>Action</td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default In;
