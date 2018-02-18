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
      id,
      name,
      type,
      value,
      disabled,
      readOnly,
      title,
      step,
      pattern,
      maxLength,
      options,
      placeholder,
      onChange,
      onPressEnter,
      style,
      feedback,
      checkbox,
      max,
    } = this.props || {}
    return (
    <Block>
      {checkbox ? null : <Label>{label}</Label>}
      <Block>
        {
          options
          ?
            <Dropdown name={name} value={value || ""} disabled={disabled} readOnly={readOnly} title={title} placeholder={placeholder} options={options} onChange={onChange} style={{...style, width: "100%"}} />
          :
          checkbox
          ?
            <Checkbox id={id} name={name} value={value} disabled={disabled} title={title} onChange={onChange}>{label}</Checkbox>
          :
            <Textbox name={name} type={type} value={value || ""} max={max} step={step} disabled={disabled} title={title} pattern={pattern} maxLength={maxLength} onChange={onChange} onPressEnter={onPressEnter} style={{...style, width: "100%"}} />
        }
      </Block>
      <Feedback feedback={feedback} />
    </Block>
    )
  }
}

export default FormGroup