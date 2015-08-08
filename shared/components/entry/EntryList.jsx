import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui';

import EntryEditButton from './EntryEditButton';

export default class EntryList extends React.Component {
  static propTypes = {
    entries: PropTypes.object,
    getEntries: PropTypes.func,
    editEntry: PropTypes.func,
    deleteEntry: PropTypes.func,
  }

  componentDidMount() {
    this.props.getEntries();
  }

  handleDelete = (e) => {
    const id = Number(e.target.dataset.id);

    this.props.deleteEntry(id);
  }

  handleEdit = (e) => {
    const id  = Number(e.target.dataset.id);
    const val = this.props.entries.get(id).text;

    const newVal = window.prompt('', val);
    this.props.editEntry(id, newVal);
  }

  render() {
    return (
      <List>
        {
          this.props.entries.map((entry, index) => {
            return (
              <ListItem
                key={index}
                primaryText={entry.text}
                rightIcon={<EntryEditButton onClick={this.handleEdit}/>}
              />
            );
          })
        }
      </List>
    );
  }
}
