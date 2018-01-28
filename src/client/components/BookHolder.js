import React from 'react';
import Book from './Book';

class BookHolder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const books = [];

    for (let i = 0; i < 10; i++) {
      books.push(<Book
        title="Hobbit"
        author="J.R.R. Tolkien"
        year="1937"
        imgSource="https://cdn.pastemagazine.com/www/system/images/photo_albums/hobbit-book-covers/large/photo_5653_0-8.jpg"
        id={'12311214'}
      />);
    }

    return <div className="bookHolder">{books}</div>;
  }
}

export default BookHolder;
