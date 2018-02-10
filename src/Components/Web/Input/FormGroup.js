import React, { Component } from 'react'
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
      name,
      type,
      value,
      options,
      placeholder,
      onChange,
      onPressEnter,
      style,
      feedback,
      checkbox,
    } = this.props
    return (
    <Block>
      {checkbox ? null : <Label>{label}</Label>}
      <Block>
        {
          options
          ?
            <Dropdown name={name} value={value || ""} placeholder={placeholder} options={options} onChange={onChange} style={{...style, width: "100%"}} />
          :
          checkbox
          ?
            <Checkbox name={name} value={value} onChange={onChange}>{label}</Checkbox>
          :
            <Textbox name={name} type={type} value={value || ""} onChange={onChange} onPressEnter={onPressEnter} style={{...style, width: "100%"}} />
        }
      </Block>
      <Feedback feedback={feedback} />
    </Block>
    )
  }
}

export default FormGroup