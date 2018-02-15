import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class CancelButtonComponent extends Component {
  state = {style: this.props.environment.styles.cancelButton}
  componentDidMount () {
    this.mounted = true
  }
  onHover = () => {
    const {styles} = this.props.environment
    this.setState({style: styles.cancelButtonHover})
  }
  onClick = (input) => {
    const {styles} = this.props.environment
    this.setState({style: styles.cancelButtonClick})
    setTimeout(this.restoreStyle, 200)
    this.props.onClick(input)
  }
  restoreStyle = () => {
    if (this.mounted) {
      const {styles} = this.props.environment
      this.setState({style: styles.cancelButton})  
    }
  }
  componentWillUnmount () {
    this.mounted = false
  }
  render () {
    const { style, children, environment, disabled } = this.props || {}
    const { cancelButton } = environment || {}
    const {onHover, onClick, restoreStyle} = this || {}
    return (
      <button disabled={disabled} children={children  || cancelButton.cancelLabel} onMouseEnter={onHover} onMouseLeave={restoreStyle} onClick={onClick} style={{ ...this.state.style, ...style}}/>
    )  
  }
}
const CancelButton = connect(mapStateToProps)(CancelButtonComponent)

export default CancelButton