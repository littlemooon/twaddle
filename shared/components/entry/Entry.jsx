import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

import * as EntryActions from 'actions/EntryActions';

import EntryList from 'components/entry/EntryList';
import EntryCreate from 'components/entry/EntryCreate';

@connect(state => ({ entries: state.entries }))
export default class Home extends React.Component {
  static propTypes = {
    entries: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { entries, dispatch } = this.props;

    return (
      <div id='entry-list'>
        <EntryCreate
          {...bindActionCreators(EntryActions, dispatch)}
        />
        <EntryList
          entries={entries}
          {...bindActionCreators(EntryActions, dispatch)}
        />
      </div>
    );
  }
}
