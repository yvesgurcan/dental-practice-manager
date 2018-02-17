import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../Web/Block'
import Button from './../Web/Button'
import SectionHeader from './../Web/SectionHeader'
import FormGroup from './../Web/Input/FormGroup'
import Feedback from './../Feedback'

class RoleSetupFormComponent extends Component {
  updateRoles = () => {

  }

  render () {
    const { styles, userRoles } = this.props.environment || {}
    const { hideDentistRole } = this.props.settings || {}
    return (
      <Block style={styles.formWrapper}>
        <Block>
          <FormGroup
            checkbox
            label="This practice is not managed by a dentist."
            name="hideDentistRole"
            value={hideDentistRole}
            onChange={this.updateRoles}
          />
          <Feedback feedback={({}).form} />
        </Block>
      </Block>
    )
  }
}
const RoleSetupForm = connect(mapStateToProps)(RoleSetupFormComponent)

export default RoleSetupForm