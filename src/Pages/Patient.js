import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'

class PatientsComponent extends Component {
  render () {
    return (
      <PageWrapper route="/patients/:patientId" menuRoute="/patients">
      </PageWrapper>
    )  
  }
}
const Patients = connect(mapStateToProps)(PatientsComponent)

export default Patients
