import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'

class TextboxComponent extends Component {
  onChange = (input) => {
    const {value, name} = input.target
    if (this.props.onChange) this.props.onChange({name, value, input: "textbox"})
  }
  onKeyPress = (input) => {
    if (input.key === "Enter" && this.props.onPressEnter) {
      this.props.onPressEnter(input)
    }
  }
  render () {
    const {styles} = this.props.environment
    const {name, type, value, style} = this.props
    return (
      <input name={name} type={type} value={value || ""} style={{...styles.textbox, ...style}} onChange={this.onChange} onKeyPress={this.onKeyPress}/>
    )  
  }
}
const Textbox = connect(mapStateToProps)(TextboxComponent)

export default Textbox