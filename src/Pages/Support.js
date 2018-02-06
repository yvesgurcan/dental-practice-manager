import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import SupportBody from './../Components/Content/Support/SupportBody'

class SupportComponent extends Component {
  render () {
    return (
      <PageWrapper>
        <SupportBody />
      </PageWrapper>
    )  
  }
}
const Support = connect(mapStateToProps)(SupportComponent)

export default Support