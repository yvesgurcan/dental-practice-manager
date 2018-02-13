import React, { Component } from 'react'
import styles from './../../../Styles/styles'

class Checkbox extends Component {
  onChange = (input) => {
    const {checked, name} = input.target
    const value = checked
    this.props.onChange({name, checked, value, input: "checkbox"})
  }
  render () {
    const {name, value, checked, style} = this.props
    return (
      <span>
        <input name={name} id={name} type={"checkbox"} checked={value || checked || false} style={{...(value || checked ? styles.checkboxChecked : styles.checkbox), ...style}} onChange={this.onChange}/>
        <label htmlFor={name}>{this.props.children}</label>
      </span>
    )  
  }
}

export default Checkbox