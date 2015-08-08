import React, { PropTypes } from 'react';

export default class AppView extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;
    return (
      <div id='app-view'>
        <h1>Twaddle</h1>
        <hr />
        {children}
      </div>
    );
  }
}
