import React from 'react';
import BusySpinner from './BusySpinner';
import { setTimeout } from 'timers';

class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
    this.imgLoaded = this.imgLoaded.bind(this);
  }

  imgLoaded() {
    this.setState({ isLoaded: true });
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <img src={this.props.imgSrc} width={this.props.width} onLoad={this.imgLoaded} />
        <div
          style={{
            position: 'absolute',
            margin: 'auto',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <BusySpinner isBusy={!this.state.isLoaded} />
        </div>
      </div>
    );
  }
}

export default ImageLoader;
