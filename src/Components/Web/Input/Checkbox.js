import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'

class CheckboxComponent extends Component {
  onChange = (input) => {
    const {id} = this.props || {}
    const {checked, name} = input.target
    const value = checked
    this.props.onChange({id, name, checked, value, input: "checkbox"})
  }
  render () {
    const {styles} = this.props.environment
    const {name, id, value, checked, style} = this.props
    return (
      <span>
        <input name={name} id={id || name} type={"checkbox"} checked={value || checked || false} style={{...(value || checked ? styles.checkboxChecked : styles.checkbox), ...style}} onChange={this.onChange}/>
        <label htmlFor={id || name}>{this.props.children}</label>
      </span>
    )  
  }
}
const Checkbox = connect(mapStateToProps)(CheckboxComponent)

export default Checkbox