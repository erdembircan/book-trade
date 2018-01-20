import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="navBackground">Book Club</div>
        <AppBar
          showMenuIconButton={false}
          iconElementRight={
            <div style={{margin: 0}}>
              <FlatButton label="Sign Up" secondary />
              <FlatButton label="Log In" secondary />
            </div>
          }
        />
      </div>
    );
  }
}

export default NavBar;
