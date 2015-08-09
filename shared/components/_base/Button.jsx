import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Button as BSButton, Glyphicon } from 'react-bootstrap';

export default class Button extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    glyph: PropTypes.string.isRequired,
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const { onClick, glyph } = this.props;
    return (
      <BSButton
        onClick={onClick}>
        <Glyphicon glyph={glyph}/>
      </BSButton>
    );
  }
}
