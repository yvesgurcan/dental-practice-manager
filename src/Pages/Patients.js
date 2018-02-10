import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import PatientsBody from './../Components/Content/Patients/PatientsBody'

class PatientsComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute="/patients">
        <PatientsBody />
      </PageWrapper>
    )  
  }
}
const Patients = connect(mapStateToProps)(PatientsComponent)

export default Patients
