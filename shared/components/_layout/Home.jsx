import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as EntryActions from 'actions/EntryActions';

import EntryList from 'components/entry/EntryList';
import EntryCreate from 'components/entry/EntryCreate';

@connect(state => ({ entries: state.entries }))
export default class Home extends React.Component {
  static propTypes = {
    entries: PropTypes.object,
    dispatch: PropTypes.func,
  }

  static needs = [
    EntryActions.getEntries
  ]

  render() {
    const { entries, dispatch } = this.props;

    return (
      <div id='entry-list'>
        <EntryList entries={entries}
          {...bindActionCreators(EntryActions, dispatch)} />
        <EntryCreate
          {...bindActionCreators(EntryActions, dispatch)} />
      </div>
    );
  }
}
