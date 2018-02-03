import React from 'react';
import { connect } from 'react-redux';
import In from './In';
import Out from './Out';
import * as actions from '../actions';

class Trades extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inReq: [],
      outReq: [],
    };

    this.getTrades = this.getTrades.bind(this);
  }

  componentDidMount() {
    this.getTrades('in');
    this.getTrades('out');
  }

  getTrades(type) {
    return this.props.getTrades(type).then((resp) => {
      const key = type === 'in' ? 'inReq' : 'outReq';
      this.setState({ [key]: resp });
    });
  }

  render() {
    return (
      <div className="bookHolder">
        <div className="trades">
          IN
          <In requests={this.state.inReq} />
        </div>
        <div className="trades">
          OUT <br />
          <Out requests={this.state.outReq} />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(Trades);
