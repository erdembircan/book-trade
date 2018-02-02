import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import BookHolder from './BookHolder';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class BookPool extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpened: false };

    this.handleModal = status => (event) => {
      this.setState({ modalOpened: status });
    };

    this.selectBook = book => (event) => {
      this.props.selectBook(book);
      this.handleModal(true)(null);
    };

    this.requestBook = this.requestBook.bind(this);
  }

  requestBook() {
    this.props.makeRequest(this.props.selectedBook.id);
    this.handleModal(false)(null);
  }

  render() {
    const buttonActions = [
      <FlatButton label="Cancel" onClick={this.handleModal(false)} />,
      <FlatButton label="Request" onClick={this.requestBook} />,
    ];

    return (
      <div>
        <BookHolder books={this.props.books} onClick={this.selectBook} />
        <Dialog actions={buttonActions} title="Trade request" modal open={this.state.modalOpened}>
          Request {this.props.selectedBook.title}?
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedBook: state.book.selected,
});

export default connect(mapStateToProps, actions)(BookPool);
