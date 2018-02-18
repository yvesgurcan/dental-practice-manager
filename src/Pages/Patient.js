import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import PatientBody from './../Components/Bodies/PatientBody'

class PatientComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: 'STORE_ROUTE', ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute='/patients'>
        <PatientBody />
      </PageWrapper>
    )  
  }
}
const Patient = connect(mapStateToProps)(PatientComponent)

export default Patient
