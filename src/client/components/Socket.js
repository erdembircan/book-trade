import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Socket extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const ws = new WebSocket(`ws://${window.location.host}`);

    ws.onmessage = (event) => {
      if (event.data) {
        const o = JSON.parse(event.data);
        if (o.data.error) {
          this.props.sendNotification(o.data.error);
        } else if (o.data.type) {
          this.props[o.data.type]();
        }
      }
    };
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default connect(null, actions)(Socket);
