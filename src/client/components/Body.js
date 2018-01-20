import React from 'react';

class Body extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bodyWrapper">
        <div className="bodyInner">{this.props.children}</div>
      </div>
    );
  }
}

export default Body;
