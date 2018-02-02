import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'

class XRaysComponent extends Component {
  render () {
    return (
      <PageWrapper route="/xrays" menuRoute="/xrays">
      </PageWrapper>
    )  
  }
}
const XRays = connect(mapStateToProps)(XRaysComponent)

export default XRays
