import React, { Component } from 'react'
import styles from './../../../Styles/styles'

class Textbox extends Component {
  onChange = (input) => {
    const {value, name} = input.target
    this.props.onChange({name, value, input: "textbox"})
  }
  onKeyPress = (input) => {
    if (input.key === "Enter" && this.props.onPressEnter) {
      this.props.onPressEnter(input)
    }
  }
  render () {
    const {name, type, value, style} = this.props
    return (
      <input name={name} type={type} value={value} style={{...styles.textbox, ...style}} onChange={this.onChange} onKeyPress={this.onKeyPress}/>
    )  
  }
}

export default Textbox