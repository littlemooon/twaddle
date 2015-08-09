import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';
import shouldPureComponentUpdate from 'react-pure-render/function';

export default class EntryInput extends React.Component {
  static propTypes = {
    initialValue: PropTypes.object.isRequired,
    propName: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { initialValue, propName } = this.props;
    this.state = {
      value: initialValue,
    };
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.initialValue !== this.props.initialValue) {
      this.setState({value: nextProps.initialValue});
    }
  }

  onChange = e => {
    const value = e.target.value;
    this.setState({value});
  }

  onBlur = () => {
    const { initialValue, propName } = this.props;
    const { value } = this.state;
    this.props.onBlur({[propName]: value});
  }

  render() {
    return (
      <Input
        type='text'
        ref='text'
        value={this.state.value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    );
  }
}
