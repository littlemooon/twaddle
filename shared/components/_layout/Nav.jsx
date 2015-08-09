import React, { PropTypes } from 'react';
import { Navbar, Nav as BSNav } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

import NavLink from './NavLink';

@connect(s => s)
export default class Nav extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  renderNavlink(to, name) {
    return (
      <NavLink
        to={to}
        dispatch={this.props.dispatch}>
        {name}
      </NavLink>
    );
  }

  render() {
    const { dispatch } = this.props;
    return (
      <Navbar brand='twaddle'>
        <BSNav>
          {[
            this.renderNavlink('entries', 'List'),
            this.renderNavlink('review', 'Review')
          ]}
        </BSNav>
      </Navbar>
    );
  }
}
