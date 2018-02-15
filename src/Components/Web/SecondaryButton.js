import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class SecondaryButtonComponent extends Component {
  state = {style: this.props.environment.styles.secondaryButton}
  onHover = () => {
    const {styles} = this.props.environment
    this.setState({style: styles.secondaryButtonHover})
  }
  onClick = (input) => {
    const {styles} = this.props.environment
    this.setState({style: styles.secondaryButtonClick})
    setTimeout(this.restoreStyle, 200)
    this.props.onClick(input)
  }
  restoreStyle = () => {
    const {styles} = this.props.environment
    this.setState({style: styles.secondaryButton})
  }
  render () {
    const { children, style } = this.props
    const {onHover, onClick, restoreStyle} = this
    return (
      <button children={children} onMouseEnter={onHover} onMouseLeave={restoreStyle} onClick={onClick} style={{ ...this.state.style, ...style}}/>
    )  
  }
}
const SecondaryButton = connect(mapStateToProps)(SecondaryButtonComponent)

export default SecondaryButton