import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'
import UpdatePatientForm from './../Forms/UpdatePatientForm'

class PatientBodyComponent extends Component {
  render () {
    return (
      <Block>
        <UpdatePatientForm />
      </Block>
    )  
  }
}
const PatientBody = connect(mapStateToProps)(PatientBodyComponent)

export default PatientBody
