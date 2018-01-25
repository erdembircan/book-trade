import React from 'react';
import { Card, CardTitle, CardHeader } from 'material-ui/Card';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import CardText from 'material-ui/Card/CardText';

class UserArea extends React.Component {
  constructor(props) {
    super(props);
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
            <RaisedButton label="add books" primary />
          </ToolbarGroup>
        </Toolbar>
        <CardText>test</CardText>
      </Card>
    );
  }
}

export default UserArea;
