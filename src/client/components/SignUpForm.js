import React from 'react';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import BusySpinner from './BusySpinner';

const SignUpForm = ({
  onSubmit, onChange, onClear, user, isBusy,
}) => (
  <Card className="formContainer">
    <CardTitle title="Sign Up" subtitle="Fill in the form" />
    <form onSubmit={onSubmit}>
      <div>
        <TextField
          floatingLabelText="User name"
          name="name"
          onChange={onChange}
          value={user.name}
          required
        />
      </div>
      <div>
        <TextField
          floatingLabelText="Password"
          name="password"
          onChange={onChange}
          value={user.password}
          required
        />
      </div>
      <div className="buttonContainer">
        <RaisedButton type="submit" label="Create Account" primary style={{ margin: '10px' }} />
        <RaisedButton
          type="button"
          label="Clear form"
          primary
          style={{ margin: '10px' }}
          onClick={onClear}
        />
      </div>
      <BusySpinner isBusy={isBusy} />
    </form>

    <CardText>
      Already have an account? Click <Link to="/login">here</Link> to log in.
    </CardText>
  </Card>
);

export default SignUpForm;
