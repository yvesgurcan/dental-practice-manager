import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class CancelButtonComponent extends Component {
  state = {style: this.props.environment.styles.cancelButton}
  
  componentDidMount () {
    this.mounted = true
  }

  onHover = () => {
    const { disabled } = this.props || {}
    if (!disabled) {
      const {styles} = this.props.environment
      this.setState({style: styles.cancelButtonHover})
    }
  }

  onClick = (input) => {
    const {styles} = this.props.environment
    this.props.dispatch({type: "CLEAR_SUPPORT_VIEWS"})
    this.props.dispatch({type: "CLEAR_SETTINGS_VIEWS"})
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
    const { style, children, environment, disabled, title, hidden } = this.props || {}
    const { cancelButton } = environment || {}
    const {onHover, onClick, restoreStyle} = this || {}
    return (
      <button hidden={hidden} disabled={disabled} children={children  || cancelButton.cancelLabel} title={title} onMouseEnter={onHover} onMouseLeave={restoreStyle} onClick={onClick} style={{ ...this.state.style, ...style}}/>
    )  
  }
}

CancelButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const CancelButton = connect(mapStateToProps)(CancelButtonComponent)

export default CancelButton