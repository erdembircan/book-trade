import React from 'react';
import ImageLoader from './ImageLoader';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgLoaded: false };
    this.imgLoaded = this.imgLoaded.bind(this);
  }

  imgLoaded() {
    this.setState({ imgLoaded: true });
  }

  render() {
    return (
      <div className="book">
        <ImageLoader imgSrc={this.props.imgSource} width="70px" />
        <div>{this.props.title}</div>
        <div>{this.props.author}</div>
        <div>{this.props.year}</div>
      </div>
    );
  }
}

export default Book;
