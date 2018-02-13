import React, { Component } from 'react'
import styles from './../../Styles/styles'

class Button extends Component {
  state = {style: styles.secondaryButton}
  onHover = () => {
    this.setState({style: styles.secondaryButtonHover})
  }
  onClick = (input) => {
    this.setState({style: styles.secondaryButtonClick})
    setTimeout(this.restoreStyle, 200)
    this.props.onClick(input)
  }
  restoreStyle = () => {
    this.setState({style: styles.secondaryButton})
  }
  render () {
    const {style} = this.props
    const {onHover, onClick, restoreStyle} = this
    return (
      <button {...this.props} onMouseEnter={onHover} onMouseLeave={restoreStyle} onClick={onClick} style={{ ...this.state.style, ...style}}/>
    )  
  }
}

export default Button