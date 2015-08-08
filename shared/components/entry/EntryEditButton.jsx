import React, { PropTypes } from 'react';
import { Styles, FontIcon } from 'material-ui';

export default class EntryEditButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return (
      <FontIcon
        iconClassName='muidocs-icon-custom-github'
        color={Styles.Colors.red500}
        tooltip='Edit'
        onClick={this.props.onClick}
      />
    );
  }
}
