import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
const FontAwesome = require('react-fontawesome')

class NavButtonComponent extends Component {
  openNav = (input) => {
    this.props.dispatch({type: 'TOGGLE_NAV'})
  }
  render () {
    let { styles } = this.props.environment
    let {item} = this.props
    return (
      <Block style={styles.navButton} onClick={this.openNav}>
        <FontAwesome name='bars' />
      </Block>
    )
  }
}
const NavButton = connect(mapStateToProps)(NavButtonComponent)

export default NavButton