import React from 'react';
import { connect } from 'react-redux';
import UserArea from '../components/UserArea';
import Socket from '../components/Socket';

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
    return (
      <div>
        {loggedIn ? (
          <Socket>
            <UserArea user={this.props.user.name} />
          </Socket>
        ) : (
          <h2>Homepage</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(HomePage);
