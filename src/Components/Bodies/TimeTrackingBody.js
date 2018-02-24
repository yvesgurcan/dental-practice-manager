import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import setWindowTitle from './../../Utility/setWindowTitle'
import moment from 'moment'
import Block from './../Web/Block'
import SectionHeader from './../Web/SectionHeader'
import ShiftNav from './../ShiftNav'

class TimeTrackingBodyComponent extends Component {
  componentWillMount = () => {
    const { year, month, day } = this.props.routeData.params || {}
    let start = undefined
    if (year && month && day) {
      start = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-MM-DD')
      this.props.dispatch({type: "STORE_DAY", day: start})
    }

    if (window.history.pushState) {
      if (!start) {
        start = moment()
        const { routes } = this.props.environment || {}
        const controller = routes.timetracking.url
        window.history.pushState('','',`${controller}/${moment(day).format('YYYY/M/D')}`)
  
      }
      
    }

  }
  render () {
    const {
      session,
      environment,
      timetracking,
    } = this.props || {}
    const { routes } = environment || {}
    const { day } = timetracking || {}
    const mainHeader = `${moment(day).format('dddd, MMMM D')}`
    setWindowTitle(mainHeader, routes.timetracking.name, session, environment)
    return (
      <Block>
        <ShiftNav />
        <SectionHeader>{mainHeader}</SectionHeader>
      </Block>
    )  
  }
}
const TimeTrackingBody = connect(mapStateToProps)(TimeTrackingBodyComponent)

export default TimeTrackingBody