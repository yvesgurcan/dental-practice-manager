import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Block from './../Block'
import Label from './../Label'
import Textbox from './Textbox'
import Checkbox from './Checkbox'
import Dropdown from './Dropdown'
import Feedback from './../../Feedback'

class FormGroup extends Component {
  render () {
    const {
      label,
      checkbox,
      options,
      style,
      feedback,
    } = this.props || {}
    return (
    <Block>
      {checkbox || !label ? null : <Label>{label}</Label>}
      <Block>
        {
          options
          ?
            <Dropdown {...this.props} style={{...style, width: "100%"}} />
          :
          checkbox
          ?
            <Checkbox {...this.props}>{label || ''}</Checkbox>
          :
            <Textbox {...this.props} style={{...style, width: "100%"}} />
        }
      </Block>
      <Feedback feedback={feedback} />
    </Block>
    )
  }
}

FormGroup.defaultProps = {
  label: '',
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onPressEnter: PropTypes.func,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  max: PropTypes.number,
  min: PropTypes.number,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  pattern: PropTypes.string,
  maxLength: PropTypes.number,
  label: PropTypes.string,
}

export default FormGroup