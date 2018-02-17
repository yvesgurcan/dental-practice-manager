import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from '../Web/Block'

class SettingsBodyComponent extends Component {
  render () {
    return (
      <Block>
      </Block>
    )  
  }
}
const SettingsBody = connect(mapStateToProps)(SettingsBodyComponent)

export default SettingsBody