import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import In from './In';
import Out from './Out';
import * as actions from '../actions';

class Trades extends React.Component {
  constructor(props) {
    super(props);

    this.getTrades = this.getTrades.bind(this);
    this.tradeAction = accept => id => (event) => {
      const content = `action=${accept}&id=${id}`;
      return axios.post('/api/tradeaction', content).then((resp) => {
        this.getTrades('in');
      });
    };
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
          <In
            requests={this.props.inbox}
            accept={this.tradeAction('accept')}
            decline={this.tradeAction('refuse')}
          />
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
