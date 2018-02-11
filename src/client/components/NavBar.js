import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Settings from 'material-ui/svg-icons/action/settings';
import { connect } from 'react-redux';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!IntersectionObserver) {
      console.error('your browser does not suppoer IntersectionObserver API');
      return;
    }
    const calculateThreshold = (numSteps) => {
      const threshold = [];

      for (let i = 1; i <= numSteps; i++) {
        const ratio = i / numSteps;
        threshold.push(ratio);
      }
      threshold.push(0);
      return threshold;
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: calculateThreshold(100),
    };

    const navBar = document.querySelector('.navWrapper');
    const margin = navBar.offsetHeight;
    const bodyWrapper = document.querySelector('.bodyWrapper');
    const originalBodyMargin = getComputedStyle(bodyWrapper).marginTop;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;
        if (ratio === 0) {
          navBar.classList.add('compact');
          bodyWrapper.style.marginTop = `${margin + parseInt(originalBodyMargin, 10)}px`;
        } else {
          navBar.classList.remove('compact');
          bodyWrapper.style.marginTop = originalBodyMargin;
        }
      });
    }, observerOptions);

    const observerTarget = document.querySelector('.navBackground');

    observer.observe(observerTarget);
  }

  render() {
    return (
      <div>
        <div className="navBackground">
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Book Club
          </a>
        </div>
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
                <a href="/">
                  <FlatButton
                    label={<i className="fas fa-home" />}
                    style={{ height: '100%', marginLeft: '8px', marginRight: '8px' }}
                    secondary
                  />
                </a>
                <a href="/settings">
                  <FlatButton
                    label={<i className="fas fa-cogs" />}
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
