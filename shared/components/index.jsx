import React, { PropTypes } from 'react';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount = () => {
    this.context.router.transitionTo('home');
  }

  render() {
    return (
      <div id='app-view'>
        <h1>Twaddle</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }
}
