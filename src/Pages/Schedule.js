import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import ScheduleBody from './../Components/Content/Schedule/ScheduleBody'

class ScheduleComponent extends Component {
  render () {
    return (
      <PageWrapper route="/schedule" menuRoute="/schedule">
        <ScheduleBody />
      </PageWrapper>
    )  
  }
}
const Schedule = connect(mapStateToProps)(ScheduleComponent)

export default Schedule
