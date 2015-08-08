import React, { PropTypes } from 'react';
import mui, { Styles } from 'material-ui';

import Nav from './Nav';

const ThemeManager = new mui.Styles.ThemeManager();

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static childContextTypes = {
    muiTheme: PropTypes.object
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Styles.Colors.deepOrange500
    });
  }

  componentDidMount = () => {
    this.context.router.transitionTo('entries');
  }

  render() {
    return (
      <div id='app-view'>
        <Nav/>
        {this.props.children}
      </div>
    );
  }
}
