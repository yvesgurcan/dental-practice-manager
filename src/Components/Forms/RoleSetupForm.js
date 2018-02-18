import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../Web/Block'
import FormGroup from './../Web/Input/FormGroup'
import Feedback from './../Feedback'

class RoleSetupFormComponent extends Component {
  updateRoles = () => {
    const { hideDentistRole } = this.props.settings || {}
    this.props.dispatch({type: "CLEAR_FEEDBACK"})
    apiRequestHandler(
      'put',
      'settings',
      {hideDentistRole: !hideDentistRole},
      this.props.session,
      this.handleUpdateRoleResponse,
    )

  }

  handleUpdateRoleResponse = (response) => {
    this.props.dispatch({type: "TOGGLE_DENTIST_ROLE_FEEDBACK", feedback: {form: {...response.feedback}}})
    if (response.hideDentistRole) {
      this.props.dispatch({ type: 'HIDE_DENTIST_ROLE' })
      return true
    }

    this.props.dispatch({ type: 'SHOW_DENTIST_ROLE' })

  }

  render () {
    const { styles } = this.props.environment || {}
    const { hideDentistRole } = this.props.settings || {}
    return (
      <Block style={styles.formWrapper}>
        <Block>
          <FormGroup
            checkbox
            label='This practice is not managed by a dentist.'
            name='hideDentistRole'
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