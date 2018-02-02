import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'

class CheckInComponent extends Component {
  render () {
    return (
      <PageWrapper route="/checkin" menuRoute="/checkin">
        ci
      </PageWrapper>
    )  
  }
}
const CheckIn = connect(mapStateToProps)(CheckInComponent)

export default CheckIn
