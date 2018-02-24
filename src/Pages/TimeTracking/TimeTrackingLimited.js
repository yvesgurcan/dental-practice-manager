import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageWrapper from './../../Components/PageWrapper'
import TimeTrackingBody from './../../Components/Bodies/TimeTrackingBody'

class TimeTrackingLimitedComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper pageTitle={null} setWindowTitleAutomatically={false}>
        <TimeTrackingBody limited />
      </PageWrapper>
    )  
  }
}

export default connect(mapStateToProps)(TimeTrackingLimitedComponent)
