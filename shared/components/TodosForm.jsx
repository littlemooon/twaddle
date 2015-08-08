import React, { PropTypes } from 'react';

export default class TodosForm extends React.Component {
  static propTypes = {
    createTodo: PropTypes.func,
  }

  handleSubmit = () => {
    const node = this.refs['todo-input'].getDOMNode();

    this.props.createTodo(node.value);

    node.value = '';
  }

  render() {
    return (
      <div id='todo-form'>
        <input type='text' placeholder='type todo' ref='todo-input' />
        <input type='submit' value='OK!' onClick={this.handleSubmit} />
      </div>
    );
  }
}
