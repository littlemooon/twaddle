import React, {PropTypes} from 'react';
import { NavItem } from 'react-bootstrap';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class NavLink extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onClick = (e) => {
    dispatch(transitionTo(`/${this.props.to}`));
  }

  render() {
    return (
      <NavItem
        onClick={this.onClick}>
        {this.props.children}
      </NavItem>
    );
  }
}
