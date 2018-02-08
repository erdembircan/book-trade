import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionAccept from 'material-ui/svg-icons/action/check-circle';
import ActionRefuse from 'material-ui/svg-icons/navigation/cancel';

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
            <td>
              {req.status === 'waiting' ? (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <IconButton onClick={props.decline(req._id)}>
                    <ActionRefuse color="red" />
                  </IconButton>
                  <IconButton onClick={props.accept(req._id)}>
                    <ActionAccept color="green" />
                  </IconButton>
                </div>
              ) : (
                <div>{req.status}</div>
              )}
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default In;
