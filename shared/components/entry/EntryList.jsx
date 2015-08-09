import React, { PropTypes } from 'react';
import { ListGroup } from 'react-bootstrap';
import shouldPureComponentUpdate from 'react-pure-render/function';

import EntryListItem from './EntryListItem';

export default class EntryList extends React.Component {
  static propTypes = {
    entries: PropTypes.object.isRequired,
    getEntries: PropTypes.func.isRequired,
    editEntry: PropTypes.func.isRequired,
    deleteEntry: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getEntries();
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  renderItem = (entry, index) => {
    const { editEntry, deleteEntry } = this.props;
    return (
      <EntryListItem
        key={index}
        entry={entry}
        editEntry={editEntry}
        deleteEntry={deleteEntry}
      />
    );
  }

  render() {
    const { entries } = this.props;
    return (
      <ListGroup>
        {entries.map(this.renderItem)}
      </ListGroup>
    );
  }
}
