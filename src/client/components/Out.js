import React from 'react';

const Out = props => (
  <table className="tradeTable" style={{ width: '100%' }}>
    <thead>
      <tr>
        <th>Owner</th>
        <th>Book</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {props.requests &&
        props.requests.map(req => (
          <tr
            key={req._id}
            className={
              req.status === 'waiting'
                ? 'tradeWaiting'
                : req.status === 'accepted' ? 'tradeAccepted' : 'tradeRefused'
            }
          >
            <td>{req.owner}</td>
            <td>{req.bookTitle}</td>
            <td>{req.status}</td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default Out;
