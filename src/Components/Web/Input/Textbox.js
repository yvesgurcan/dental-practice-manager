import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import Block from './../Block'

class TextboxComponent extends Component {
  onChange = (input) => {
    const { pattern, type, max, min } = this.props || {}
    const {value, name} = input.target
    let interceptedValue = value
    if (pattern) {
      const regex = new RegExp(pattern, 'g')
      const match = interceptedValue.match(regex)
      if (match === null) {
        interceptedValue = ''
      }
      else {
        interceptedValue = match.join('')
      }

    }

    if (type === "number" && interceptedValue.length > 1) {
      interceptedValue = interceptedValue.replace(/^0+/, '')
    }

    if (interceptedValue !== this.props.value) {
      if (max && interceptedValue !== '') {
        interceptedValue = Math.min(max, interceptedValue)
      }
  
      if (min && interceptedValue !== '') {
        interceptedValue = Math.max(min, interceptedValue)
      }
      if (this.props.onChange) this.props.onChange({name, value: interceptedValue, input: "textbox"})
    }
    
  }
  onKeyPress = (input) => {
    if (input.key === "Enter" && this.props.onPressEnter) {
      this.props.onPressEnter(input)
    }
  }
  render () {
    const { styles } = this.props.environment
    const {
      name,
      type,
      disabled,
      readOnly,
      value,
      placeholder,
      style,
      pattern,
      maxLength,
      step,
      max,
      min,
    } = this.props
    let interceptedType = type
    if (type === 'number') {
      interceptedType = null
    }

    let interceptedStep = step
    if (type === 'time') {
      interceptedStep = 60*15
    }

    let interceptedValue = value
    if (max !== undefined && interceptedValue !== '' && interceptedValue > max) {
      interceptedValue = Math.min(max, interceptedValue)
    }

    if (min !== undefined && interceptedValue !== '' && interceptedValue < min) {
      interceptedValue = Math.max(min, interceptedValue)
    }

    if (readOnly) {
      return <Block style={{...styles.readOnlyField, ...style}} >{value}</Block>
    }

    return (
      <input
        name={name}
        type={interceptedType}
        value={interceptedValue}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
        step={interceptedStep}
        pattern={pattern}
        maxLength={maxLength}
        style={{...styles.textbox, ...style}}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}/>
    )  
  }
}

TextboxComponent.defaultProps = {
  value: '',
}

TextboxComponent.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
}

const Textbox = connect(mapStateToProps)(TextboxComponent)

export default Textbox