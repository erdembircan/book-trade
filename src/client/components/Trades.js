import React from 'react';
import Out from './Out';

class Trades extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bookHolder">
        <div className="trades">IN</div>
        <div className="trades">
          OUT <br />
          <Out title="Hobbit" owner="admin" status="waiting" />
        </div>
      </div>
    );
  }
}

export default Trades;
