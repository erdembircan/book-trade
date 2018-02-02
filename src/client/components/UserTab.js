import React from 'react';
import { Tab } from 'material-ui/Tabs';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import CardText from 'material-ui/Card/CardText';

const UserTab = props => (
  <div>
    <Toolbar>
      <ToolbarGroup firstChild>
        <ToolbarTitle text={props.toolbarTitle} style={{ marginLeft: '10px' }} />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarSeparator />
        {props.toolbarButtons}
      </ToolbarGroup>
    </Toolbar>
    <CardText>{props.children}</CardText>
  </div>
);

export default UserTab;
