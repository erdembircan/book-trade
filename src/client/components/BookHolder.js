import React from 'react';
import Book from './Book';

// class BookHolder extends React.Component {
//   constructor(props) {
//     super(props);
//   }

const BookHolder = props => (
  <div className="bookHolder">
    {props.books.length > 0 ? (
      props.books.map(book => (
        <Book
          title={book.title}
          author={book.author}
          year={book.year}
          imgSource={book.image}
          id={book.id}
          key={book.id}
          onClick={props.onClick(book)}
        />
      ))
    ) : (
      <p style={{ color: 'grey' }}>You don't have any books...</p>
    )}
  </div>
);

export default BookHolder;
