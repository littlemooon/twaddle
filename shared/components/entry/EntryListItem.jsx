import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Button from 'components/_base/Button';
import EntryInput from './EntryInput';

export default class EntryListItem extends React.Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    editEntry: PropTypes.func.isRequired,
    deleteEntry: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  handleEdit = e => {
    this.setState({edit: !this.state.edit});
  }

  handleDelete = e => {
    this.props.deleteEntry({id: this.props.entry.id});
  }

  onInputBlur = update => {
    const { entry, editEntry } = this.props;
    editEntry({...entry, ...update});
  }

  renderInput(propName) {
    const { entry } = this.props;
    const { edit } = this.state;
    if (!edit) return entry[propName];
    return (
      <EntryInput
        initialValue={entry[propName]}
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
        <Col sm={1}>
          <Button
            onClick={this.handleEdit}
            glyph='edit'
          />
        </Col>
        <Col sm={1}>
          <Button
            onClick={this.handleDelete}
            glyph='remove'
          />
        </Col>
      </Row>
    );
  }
}
