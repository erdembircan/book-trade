import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="navBackground">Book Club</div>
        <div className="navWrapper">
          <div className="navLogo">Book Club</div>
          <div style={{ height: '100%' }}>
            {!this.props.isLoggedIn() ? (
              <div className="buttonsRight">
                <a href="/signup">
                  <FlatButton
                    label="Sign Up"
                    style={{ height: '100%', marginLeft: '8px', marginRight: '8px' }}
                    secondary
                  />
                </a>
                <a href="/login">
                  <FlatButton
                    label="Log In"
                    style={{ height: '100%', marginLeft: '8px', marginRight: '8px' }}
                    secondary
                  />
                </a>
              </div>
            ) : (
              <div className="buttonsRight">
                <a href="/logout">
                  <FlatButton
                    label="Log Out"
                    style={{ height: '100%', marginLeft: '8px', marginRight: '8px' }}
                    secondary
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: () => {
    if (state.user.name) return true;
    return false;
  },
  user: state.user,
});

export default connect(mapStateToProps, null)(NavBar);
