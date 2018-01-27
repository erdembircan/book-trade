import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BusySpinner from './BusySpinner';
import Book from './Book';

const SearchBookForm = ({
  onSubmit, onChange, book, isBusy, results,
}) => (
  <Card className="formContainer" style={{ backgroundColor: 'seashell' }}>
    <CardTitle title="Search for a book" subtitle="Fill in the form" />
    <form onSubmit={onSubmit}>
      <div>
        <TextField
          floatingLabelText="Book title"
          name="title"
          onChange={onChange}
          value={book.title}
          autoComplete="on"
          required
        />
      </div>
      <div className="buttonContainer">
        <RaisedButton
          type="submit"
          label="Search"
          primary
          style={{ margin: '10px' }}
          disabled={isBusy}
        />
      </div>
    </form>
    <BusySpinner isBusy={isBusy} />
    <div className="bookHolder">
      {results.map(item => (
        <Book title={item.title} year={item.year} author={item.author} imgSource={item.image} />
      ))}
    </div>
  </Card>
);

export default SearchBookForm;
