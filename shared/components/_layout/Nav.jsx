import React from 'react';
import { Navbar, Nav as BSNav } from 'react-bootstrap';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

import NavLink from './NavLink';

export default class Nav extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <Navbar brand='twaddle'>
        <BSNav>
          <NavLink to='entries'>List</NavLink>
          <NavLink to='review'>Review</NavLink>
        </BSNav>
      </Navbar>
    );
  }
}
