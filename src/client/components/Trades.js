import React from 'react';
import { connect } from 'react-redux';
import In from './In';
import Out from './Out';
import * as actions from '../actions';

class Trades extends React.Component {
  constructor(props) {
    super(props);

    this.getTrades = this.getTrades.bind(this);
  }

  componentDidMount() {
    this.getTrades('in');
    this.getTrades('out');
  }

  getTrades(type) {
    return this.props.getTrades(type);
  }

  render() {
    return (
      <div className="bookHolder">
        <div className="trades">
          IN
          <In requests={this.props.inbox} />
        </div>
        <div className="trades">
          OUT <br />
          <Out requests={this.props.outbox} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  inbox: state.trades.inbox,
  outbox: state.trades.outbox,
});

export default connect(mapStateToProps, actions)(Trades);
