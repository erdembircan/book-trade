import React from 'react';
import LogInForm from '../components/LogInForm';
import { connect } from 'react-redux';
import { getIsFetching } from '../reducers';
import * as actions from '../actions';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        password: '',
      },
    };

    this.processInput = this.processInput.bind(this);
    this.processForm = this.processForm.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  processInput(e) {
    const field = e.target.name;
    const { value } = e.target;
    const { user } = this.state;
    user[field] = value;

    this.setState({ user });
  }

  clearForm(e) {
    const { user } = this.state;
    Object.keys(user).map((key) => {
      user[key] = '';
    });

    this.setState({ user });
    this.props.setError();
  }

  processForm(e) {
    e.preventDefault();
    this.props.setError();
    this.props.logUser(this.state.user).then((res) => {
      if (res && res.response) {
        window.location.replace('/');
      }
    });
  }

  render() {
    return (
      <div>
        <LogInForm
          onChange={this.processInput}
          user={this.state.user}
          onSubmit={this.processForm}
          onClear={this.clearForm}
          isBusy={this.props.isFetching}
          errors={this.props.errors}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
  errors: state.util.errors,
});

const LogInConnect = connect(mapStateToProps, actions)(LogIn);

export default LogInConnect;
