import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstTime: true };
    this.delayRender = this.delayRender.bind(this);
  }

  componentDidMount() {
    this.delayRender(1000);
  }

  delayRender(time) {
    setTimeout(() => {
      this.setState({ firstTime: false });
    }, time);
  }

  render() {
    return (
      <Snackbar
        autoHideDuration={3000}
        open={this.state.firstTime ? false : this.props.open}
        message={this.props.message}
        onRequestClose={this.props.closeNotification}
      />
    );
  }
}

const mapStateToProps = state => ({
  message: state.util.notifications.message,
  open: state.util.notifications.open,
});

export default connect(mapStateToProps, actions)(Notifications);
