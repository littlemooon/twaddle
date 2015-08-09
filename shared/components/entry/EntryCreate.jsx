import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Button from 'components/_base/Button';
import EntryInput from './EntryInput';

const defaultState = {
  text1: '',
  text2: '',
};

export default class EntryCreate extends React.Component {
  static propTypes = {
    createEntry: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  handleSubmit = e => {
    const { text1, text2 } = this.state;
    this.props.createEntry({text1, text2});
    this.setState(defaultState);
  }

  onInputBlur = update => {
    this.setState({...this.state, ...update});
  }

  renderInput(propName) {
    return (
      <EntryInput
        initialValue={this.state[propName]}
        propName={propName}
        onBlur={this.onInputBlur}
      />
    );
  }

  render() {
    return (
      <Row>
        <Col sm={5}>
          {this.renderInput('text1')}
        </Col>
        <Col sm={5}>
          {this.renderInput('text2')}
        </Col>
        <Col sm={2}>
          <Button
            onClick={this.handleSubmit}
            glyph='done'
          />
        </Col>
      </Row>
    );
  }
}
