import React from 'react';
import ImageLoader from './ImageLoader';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imgLoaded: false };
    this.imgLoaded = this.imgLoaded.bind(this);
    this.bookClicked = this.bookClicked.bind(this);
  }

  imgLoaded() {
    this.setState({ imgLoaded: true });
  }

  bookClicked(e) {
    if (this.props.onClick) this.props.onClick(this.props);
  }

  render() {
    const bookStyle = `book ${this.props.selectedId === this.props.id ? 'selected' : ''}`;
    return (
      <div className={bookStyle} onClick={this.bookClicked}>
        <ImageLoader imgSrc={this.props.imgSource} width="70px" />
        <div>{this.props.title}</div>
        <div>{this.props.author}</div>
        <div>{this.props.year}</div>
      </div>
    );
  }
}

export default Book;
