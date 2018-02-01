import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, CardTitle, CardHeader } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import CardText from 'material-ui/Card/CardText';
import BookHolder from './BookHolder';
import AddBookModal from './AddBookModal';
import * as actions from '../actions';

class UserArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addBookModalOpen: false,
      bookpool: [],
    };

    this.handleAddBookModal = state => (event) => {
      this.setState({ addBookModalOpen: state });
    };

    this.getPoolBooks = this.getPoolBooks.bind(this);
    this.requestBook = book => (event) => {
      this.props.makeRequest(book.id);
    };
  }
  componentDidMount() {
    this.props.getUserBooks().then((resp) => {
      this.getPoolBooks();
    });
  }

  getPoolBooks() {
    this.props.getBookPool().then((resp) => {
      if (resp) {
        const filtered = resp.filter((book) => {
          const index = this.props.userbooks.map(item => item.id).indexOf(book.id);

          if (index >= 0) return false;
          return true;
        });

        this.setState({ bookpool: filtered });
      }
    });
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.user}
          // subtitle="here is your books..."
          avatar="public/client/img/favicon.ico"
        />
        <Tabs>
          <Tab label="Your Books">
            <Toolbar>
              <ToolbarGroup firstChild>
                <ToolbarTitle text="Your Books" style={{ marginLeft: '10px' }} />
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton label="add book" primary onClick={this.handleAddBookModal(true)} />
              </ToolbarGroup>
            </Toolbar>
            <CardText>
              <BookHolder books={this.props.userbooks} onClick={() => {}} />
            </CardText>
            <AddBookModal
              open={this.state.addBookModalOpen}
              openHandler={this.handleAddBookModal}
            />
          </Tab>
          <Tab label="Book Pool">
            <Toolbar>
              <ToolbarGroup firstChild>
                <ToolbarTitle text="Book Pool" style={{ marginLeft: '10px' }} />
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarSeparator />
                <RaisedButton label="Refresh" primary onClick={this.getPoolBooks} />
              </ToolbarGroup>
            </Toolbar>
            <CardText>
              <BookHolder books={this.state.bookpool} onClick={this.requestBook} />
            </CardText>
          </Tab>
        </Tabs>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  userbooks: state.book.userbooks,
});

export default connect(mapStateToProps, actions)(UserArea);
