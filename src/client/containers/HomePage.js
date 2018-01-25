import React from 'react';
import { connect } from 'react-redux';
import UserArea from '../components/UserArea';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
    if (this.props.user.name) return true;
    return false;
  }

  render() {
    const loggedIn = this.isLoggedIn();
    return <div>{loggedIn ? <UserArea user={this.props.user.name} /> : <h2>Homepage</h2>}</div>;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(HomePage);
