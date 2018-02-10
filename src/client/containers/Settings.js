import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions';
import SettingsForm from '../components/SettingsForm';
import { getIsFetching } from '../reducers';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        fullname: '',
        city: '',
        state: '',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const targetName = event.target.name;
    const user = this.state.user;

    user[targetName] = event.target.value;
    this.setState({ user });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    const content = `fullname=${user.fullname}&city=${user.city}&state=${user.state}`;
    this.props.updateUser(content);
  }

  componentDidMount() {
    return axios({
      method: 'get',
      url: '/api/settings',
    })
      .then((resp) => {
        console.log(resp.data.response);
        if (resp && resp.data) {
          const { fullname, city, state } = resp.data.response.user;
          this.setState({
            user: {
              fullname,
              city,
              state,
            },
          });
        } else {
          this.props.sendNotification('an error occured');
        }
      })
      .catch((err) => {
        this.props.sendNotification('an error occured');
      });
  }

  render() {
    return (
      <SettingsForm
        user={this.state.user}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        isBusy={this.props.isFetching}
      />
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
});

export default connect(mapStateToProps, actions)(Settings);
