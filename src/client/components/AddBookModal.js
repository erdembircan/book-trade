import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SearchBookForm from './SearchBookForm';
import { getIsFetching } from '../reducers';
import * as actions from '../actions';

class AddBookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: { title: '' },
      results: [],
    };
    this.processInput = this.processInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.bookClicked = this.bookClicked.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  processInput(e) {
    const key = e.target.name;
    const { value } = e.target;
    const { book } = this.state;

    book[key] = value;

    this.setState({ book });
  }

  submitForm(e) {
    e.preventDefault();
    this.props.queryBook(this.state.book.title).then((res) => {
      if (res && res.response) {
        this.setState({ results: res.response });
      }
    });
  }

  bookClicked(params) {
    this.props.selectBook({
      title: params.title,
      author: params.author,
      year: params.year,
      image: params.imgSource,
      id: params.id,
    });
  }

  addBook() {
    this.props.addBook(this.props.selected).then((resp) => {
      this.props.openHandler(false)();
    });
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" onClick={this.props.openHandler(false)} />,
      <FlatButton
        label="Add Book"
        onClick={this.addBook}
        disabled={this.props.isFetching || this.props.selected.title === undefined}
      />,
    ];

    return (
      <Dialog title="Add a book" modal open={this.props.open} actions={actions}>
        <SearchBookForm
          book={{ title: this.state.book.title }}
          onChange={this.processInput}
          onSubmit={this.submitForm}
          results={this.state.results}
          isBusy={this.props.isFetching}
          onClick={this.bookClicked}
          selected={this.props.selected.id}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
  selected: state.book.selected,
});

export default connect(mapStateToProps, actions)(AddBookModal);
