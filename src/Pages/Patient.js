import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'

class PatientComponent extends Component {
  render () {
    return (
      <PageWrapper route="/patients/:patientId([1-9]|[0-9]{2,}|new|add)" menuRoute="/patients">
      </PageWrapper>
    )  
  }
}
const Patient = connect(mapStateToProps)(PatientComponent)

export default Patient
