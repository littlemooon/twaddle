import React, { PropTypes } from 'react';

export default class EntryList extends React.Component {
  static propTypes = {
    entries: PropTypes.object,
    getEntries: PropTypes.func,
    editEntry: PropTypes.func,
    deleteEntry: PropTypes.func,
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
      <div id='entry-list'>
        {
          this.props.entries.map((entry, index) => {
            return (
              <div key={index}>
                <span>{entry}</span>

                <button data-id={index} onClick={this.handleDelete}>
                  X
                </button>
                <button data-id={index} onClick={this.handleEdit}>
                  Edit
                </button>
              </div>
            );
          })
        }
      </div>
    );
  }
}
