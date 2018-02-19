import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageWrapper from './../../Components/PageWrapper'
import OperatoriesBody from './../../Components/Bodies/OperatoriesBody'

class OperatoriesComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute='/settings'>
        <OperatoriesBody />
      </PageWrapper>
    )  
  }
}
const Operatories = connect(mapStateToProps)(OperatoriesComponent)

export default Operatories
