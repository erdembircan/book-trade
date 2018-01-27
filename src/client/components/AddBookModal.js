import React from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SearchBookForm from './SearchBookForm';

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
    axios({
      method: 'get',
      url: `/api/getbook?bookName=${this.state.book.title}`,
    }).then((res) => {
      console.log(res.data);
      this.setState({ results: [] });
      this.setState({ results: res.data });
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
      <Dialog
        title="Add a book"
        modal
        open={this.props.open}
        actions={actions}
      >
        <SearchBookForm
          book={{ title: this.state.book.title }}
          onChange={this.processInput}
          onSubmit={this.submitForm}
          results={this.state.results}
        />
      </Dialog>
    );
  }
}

export default AddBookModal;
