import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

if (process.env.BROWSER) require('less/main.less');

import Nav from './Nav';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  // static contextTypes = {
  //   router: PropTypes.object.isRequired
  // }

  // componentDidMount = () => {
  //   this.context.router.transitionTo('entries');
  // }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <div id='app-view'>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}
