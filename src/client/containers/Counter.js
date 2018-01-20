import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions';

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onIncrement, onDecrement } = this.props;

    return (
      <p>
        Clicked: {value} times
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </p>
    );
  }
}

const mapStateToProps = state => ({
  value: state.value,
});

const mapDispatchToProps = dispatch => ({
  onIncrement: () => {
    dispatch(actions.incrementAction);
  },
  onDecrement: () => {
    dispatch(actions.decrementAction);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
