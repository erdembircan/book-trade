import React from 'react';

class Socket extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = (event) => {
      console.log(event.data);
    };
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default Socket;
