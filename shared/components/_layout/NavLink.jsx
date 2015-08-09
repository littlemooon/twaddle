import React, {PropTypes} from 'react';
import { NavItem } from 'react-bootstrap';
import { transitionTo } from 'redux-react-router';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class NavLink extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onClick = (e) => {
    this.props.dispatch(transitionTo(`/${this.props.to}`));
  }

  render() {
    return (
      <NavItem
        onClick={this.onClick.bind(this)}>
        {this.props.children}
      </NavItem>
    );
  }
}
