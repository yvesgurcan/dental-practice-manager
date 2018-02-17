import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from '../Web/Block'
import RoleSetupForm from '../Forms/RoleSetupForm'

class SettingsBodyComponent extends Component {
  render () {
    return (
      <Block>
        <RoleSetupForm />
      </Block>
    )  
  }
}
const SettingsBody = connect(mapStateToProps)(SettingsBodyComponent)

export default SettingsBody