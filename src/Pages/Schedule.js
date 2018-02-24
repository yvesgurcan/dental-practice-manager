import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import ScheduleBody from './../Components/Bodies/ScheduleBody'

class ScheduleComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match, ...this.props.location})
  }
  render () {
    return (
      <PageWrapper pageTitle={null} setWindowTitleAutomatically={false} >
        <ScheduleBody />
      </PageWrapper>
    )  
  }
}
const Schedule = connect(mapStateToProps)(ScheduleComponent)

export default Schedule
