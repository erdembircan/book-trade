import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BusySpinner from './BusySpinner';

const SettingsForm = ({
  onSubmit, onChange, user, isBusy,
}) => (
  <Card className="formContainer">
    <CardTitle title="Update User Info" subtitle="Fill in the form" />
    <form onSubmit={onSubmit}>
      <div>
        <TextField
          floatingLabelText="Full name"
          name="fullname"
          onChange={onChange}
          value={user.fullname}
          autoComplete="on"
        />
      </div>
      <div>
        <TextField
          floatingLabelText="City"
          name="city"
          onChange={onChange}
          value={user.city}
          autoComplete="on"
        />
      </div>
      <div>
        <TextField
          floatingLabelText="State"
          name="state"
          onChange={onChange}
          value={user.state}
          autoComplete="on"
        />
      </div>
      <div className="buttonContainer">
        <RaisedButton
          type="submit"
          label="Update"
          primary
          style={{ margin: '10px' }}
          disabled={isBusy}
        />
      </div>
      <BusySpinner isBusy={isBusy} />
    </form>
  </Card>
);

export default SettingsForm;
