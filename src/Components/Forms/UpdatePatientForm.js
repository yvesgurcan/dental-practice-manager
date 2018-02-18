import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../Web/Block'
import Button from './../Web/Button'
import FormGroup from './../Web/Input/FormGroup'
import Feedback from './../Feedback'

class UpdatePatientFormComponent extends Component {
  updatePatient = () => {
    
  }
  
  render () {
    const { styles } = this.props.environment || {}
    const { updatePatientFeedback } = this.props.patients || {}
    const { patients } = this.props.patients || {}
    const updatePatient = {}
    return (
      <Block style={styles.formWrapper}>
        <Block>
          <FormGroup
            label='First Name'
            name='firstName'
            value={(updatePatient || {}).firstName}
            onChange={this.updatePatient}
          />
          <Feedback feedback={(updatePatientFeedback || {}).form} />
        </Block>
      </Block>
    )
  }
}
const UpdatePatientForm = connect(mapStateToProps)(UpdatePatientFormComponent)

export default UpdatePatientForm
