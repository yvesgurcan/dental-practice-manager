import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageWrapper from './../../Components/PageWrapper'
import OperatoryBody from './../../Components/Bodies/OperatoryBody'

class OperatoryComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute='/settings'>
        <OperatoryBody />
      </PageWrapper>
    )  
  }
}
const Operatory = connect(mapStateToProps)(OperatoryComponent)

export default Operatory
