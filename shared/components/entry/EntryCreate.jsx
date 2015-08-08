import React, { PropTypes } from 'react';

export default class EntryCreate extends React.Component {
  static propTypes = {
    createEntry: PropTypes.func,
  }

  handleSubmit = () => {
    const node = this.refs['entry-input'].getDOMNode();

    this.props.createEntry(node.value);

    node.value = '';
  }

  render() {
    return (
      <div id='entry-form'>
        <input type='text' placeholder='type entry' ref='entry-input' />
        <input type='submit' value='OK!' onClick={this.handleSubmit} />
      </div>
    );
  }
}
