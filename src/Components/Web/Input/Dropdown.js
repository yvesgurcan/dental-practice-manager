import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'

class Dropdown extends Component {
  render () {
    if (this.props.hidden) return null
    return (
      <InternalDropdown {...this.props} />
    )
  }
}

class InternalDropdownComponent extends Component {
  state = {styleState: this.props.environment.styles.dropdown}
  componentWillMount = () => {
    const { disabled } = this.props || {}
    if (disabled) {
      const {styles} = this.props.environment || {}
      this.setState({ styleState: styles.dropdownDisabled })
    }
  }
  componentWillUpdate = (nextProps) => {
    const { styleState } = this.state
    const {styles} = this.props.environment || {}
    if (this.props.disabled && !nextProps.disabled) {
      if (styleState !== styles.dropdown) {
        this.setState({styleState: styles.dropdown})
      }
    }
    else if (!this.props.disabled && nextProps.disabled) {
      if (styleState !== styles.dropdownDisabled) {
        this.setState({styleState: styles.dropdownDisabled})
      }
    }
  }
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
    const {styles} = this.props.environment
    const {styleState} = this.state || {}
    if (this.props.hidden) return null
    const { name, value, style, options, placeholder, disabled, title } = this.props
    return (
      <span style={styles.dropdownContainer}>
        <select name={name} disabled={disabled} title={title} value={value || -1} style={{...styleState, ...style}} onChange={this.onChange} onKeyPress={this.onKeyPress}>
          {placeholder ? <option value={-1}>{placeholder}</option> : null}
          {(options || []).map(option => <option key={option.value || option.label} value={option.value}>{option.label}</option>)}
        </select>
      </span>
    )  
  }
}
const InternalDropdown = connect(mapStateToProps)(InternalDropdownComponent)

export default Dropdown