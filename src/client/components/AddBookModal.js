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
      selected: { title: '' },
    };
    this.processInput = this.processInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
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
        this.setState({ results: [] });
        this.setState({ results: res.response });
      }
    });
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" onClick={this.props.openHandler(false)} />,
      <FlatButton
        label="Add Book"
        onClick={this.props.openHandler(false)}
        disabled={this.state.selected.title === ''}
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
        />
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
});

export default connect(mapStateToProps, actions)(AddBookModal);
