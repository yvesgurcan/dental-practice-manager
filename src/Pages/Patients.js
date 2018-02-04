import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import PatientsBody from './../Components/Content/Patients/PatientsBody'

class PatientsComponent extends Component {
  render () {
    return (
      <PageWrapper route="/patients" menuRoute="/patients">
        <PatientsBody />
      </PageWrapper>
    )  
  }
}
const Patients = connect(mapStateToProps)(PatientsComponent)

export default Patients
