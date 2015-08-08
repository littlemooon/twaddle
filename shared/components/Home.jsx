import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TodoActions from 'actions/TodoActions';

import TodosView from 'components/TodosView';
import TodosForm from 'components/TodosForm';

@connect(state => ({ todos: state.todos }))
export default class Home extends React.Component {

  static propTypes = {
    todos: PropTypes.array,
    dispatch: PropTypes.func,
  }

  render() {
    const { todos, dispatch } = this.props;

    return (
      <div id='todo-list'>
        <TodosView todos={todos}
          {...bindActionCreators(TodoActions, dispatch)} />
        <TodosForm
          {...bindActionCreators(TodoActions, dispatch)} />
      </div>
    );
  }
}
