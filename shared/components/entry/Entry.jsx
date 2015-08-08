import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mui from 'material-ui';

import * as EntryActions from 'actions/EntryActions';

import EntryList from 'components/entry/EntryList';
import EntryCreate from 'components/entry/EntryCreate';

const ThemeManager = new mui.Styles.ThemeManager();

@connect(state => ({ entries: state.entries }))
export default class Home extends React.Component {
  static propTypes = {
    entries: PropTypes.object,
    dispatch: PropTypes.func,
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

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
