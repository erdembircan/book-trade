import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';
import RaisedButton from 'material-ui/RaisedButton';
import BookHolder from './BookHolder';
import AddBookModal from './AddBookModal';
import BookPool from './BookPool';
import UserTab from './UserTab';
import Trades from './Trades';
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
            <UserTab
              toolbarTitle="Your Books"
              toolbarButtons={
                <RaisedButton label="add book" primary onClick={this.handleAddBookModal(true)} />
              }
            >
              <BookHolder books={this.props.userbooks} onClick={() => {}} />
            </UserTab>
            <AddBookModal
              open={this.state.addBookModalOpen}
              openHandler={this.handleAddBookModal}
            />
          </Tab>
          <Tab label="Book Pool">
            <UserTab
              toolbarTitle="Book Pool"
              toolbarButtons={<RaisedButton label="Refresh" primary onClick={this.getPoolBooks} />}
            >
              <BookPool books={this.state.bookpool} />
            </UserTab>
          </Tab>
          <Tab
            label={
              <Badge badgeStyle={{ backgroundColor: 'red' }} badgeContent={this.props.unchecked}>
                Trades
              </Badge>
            }
          >
            <UserTab
              toolbarTitle="Trades"
              toolbarButtons={<RaisedButton label="Refresh" primary onClick={this.getPoolBooks} />}
            >
              <Trades />
            </UserTab>
          </Tab>
        </Tabs>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  unchecked: state.util.unchecked,
  userbooks: state.book.userbooks,
});

export default connect(mapStateToProps, actions)(UserArea);
