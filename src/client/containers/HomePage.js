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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <h2>Welcome to Book Club</h2>
            <h3>Share, update and trade your library with others</h3>
            <p>Log in or sign up to continue...</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(HomePage);
