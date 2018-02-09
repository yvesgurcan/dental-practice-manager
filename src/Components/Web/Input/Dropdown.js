import React, { Component } from 'react'
import styles from './../../../Styles/styles'

class Dropdown extends Component {
  render () {
    if (this.props.hidden) return null
    return (
      <InternalDropdown {...this.props} />
    )
  }
}

class InternalDropdown extends Component {
  onChange = (input) => {
    const {options} = this.props
    const {value, name} = input.target
    const valueProcessed = value === "-1" ? null : !isNaN(Number(value)) ? Number(value) : value
    const label = input.target[input.target.selectedIndex].label
    const objectMatch = options.filter(option => option.value === valueProcessed)
    const object = objectMatch.length > 0 ? objectMatch[0].object : {}
    this.props.onChange({input: "dropdown", name, value: valueProcessed, label, object})
  }
  onKeyPress = (input) => {
    if (input.key === "Enter" && this.props.onPressEnter) {
      this.props.onPressEnter(input)
    }
  }
  render () {
    if (this.props.hidden) return null
    const {name, type, value, style, options, placeholder} = this.props
    return (
      <select name={name} type={type} value={value || -1} style={{...styles.dropdown, ...style}} onChange={this.onChange} onKeyPress={this.onKeyPress}>
        {placeholder ? <option value={-1}>{placeholder}</option> : null}
        {(options || []).map(option => <option key={option.value || option.label} value={option.value}>{option.label}</option>)}
      </select>
    )  
  }
}

export default Dropdown