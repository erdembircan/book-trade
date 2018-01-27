import React from 'react';
import { Card, CardTitle, CardHeader } from 'material-ui/Card';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import CardText from 'material-ui/Card/CardText';
import BookHolder from './BookHolder';
import AddBookModal from './AddBookModal';

class UserArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addBookModalOpen: false,
    };

    this.handleAddBookModal = state => (event) => {
      this.setState({ addBookModalOpen: state });
    };
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.user}
          subtitle="here is your books..."
          avatar="public/client/img/favicon.ico"
        />
        <Toolbar>
          <ToolbarGroup firstChild>
            <ToolbarTitle text="Books" style={{ marginLeft: '10px' }} />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarSeparator />
            <RaisedButton label="add book" primary onClick={this.handleAddBookModal(true)} />
          </ToolbarGroup>
        </Toolbar>
        <CardText>
          <BookHolder />
        </CardText>
        <AddBookModal open={this.state.addBookModalOpen} openHandler={this.handleAddBookModal} />
      </Card>
    );
  }
}

export default UserArea;
