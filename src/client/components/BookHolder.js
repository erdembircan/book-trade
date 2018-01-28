import React from 'react';
import { connect } from 'react-redux';
import Book from './Book';
import { getIsFetching } from '../reducers';
import * as actions from '../actions';

class BookHolder extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserBooks();
  }

  render() {
    return (
      <div className="bookHolder">
        {this.props.books.length > 0 ? (
          this.props.books.map(book => (
            <Book
              title={book.title}
              author={book.author}
              year={book.year}
              imgSource={book.image}
              id={book.id}
              key={book.id}
            />
          ))
        ) : (
          <p style={{color: 'grey'}}>You don't have any books...</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
  books: state.book.userbooks,
});

export default connect(mapStateToProps, actions)(BookHolder);
