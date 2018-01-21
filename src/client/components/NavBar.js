import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';

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
          <div className="buttonsRight">
            <Link to="/signup">
              <FlatButton
                label="Sign Up"
                style={{ height: '100%', marginLeft: '8px', marginRight: '8px' }}
                secondary
              />
            </Link>
            <Link to="/login">
              <FlatButton
                label="Log In"
                style={{ height: '100%', marginLeft: '8px', marginRight: '8px' }}
                secondary
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
