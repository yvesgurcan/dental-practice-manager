import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import setWindowTitle from './../../Utility/setWindowTitle'
import moment from 'moment'
import Link from './../Web/Link'
import Block from './../Web/Block'
import Text from './../Web/Text'
import SectionHeader from './../Web/SectionHeader'
import ShiftNav from './../ShiftNav'
import ShiftsTable from './../ShiftsTable'

class TimeTrackingBodyComponent extends Component {
  componentWillMount = () => {
    const { year, month, day } = this.props.routeData.params || {}
    let start = undefined
    let inputDate = undefined
    if (year && month && day) {
      inputDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('YYYY-MM-DD')
      start = this.excludeWeekend(inputDate)
    }
    else {
      start = this.excludeWeekend(moment()).format('YYYY-MM-DD')
      this.setUrl()
    }

    this.props.dispatch({type: "STORE_SHIFT_DAY", day: start})
    this.getShifts(start)

    apiRequestHandler(
      'get',
      'settings',
      {},
      this.props.session,
      this.storeSettings,
    )

  }

  setUrl = () => {
    const { review } = this.props || {}
    let start = undefined
    let inputDate = undefined
    if (window.history.pushState) {
      if (!start || inputDate !== start) {
        start = this.excludeWeekend(moment())
        const { routes } = this.props.environment || {}
        const controller = review ? routes.timetracking.subroutes.review.url : routes.timetracking.url
        window.history.pushState('','',`${controller}/${moment(start).format('YYYY/M/D')}`)
  
      }
      
    }
  }

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
  }

  excludeWeekend = (date) => {
    if (moment(date).format('d') === '6' || moment(date).format('d') === '0') {
      return moment(date, 'YYYY-MM-DD').subtract(1, 'day').startOf('week').add(5, 'days')
    }

    return date
  }

  getShifts = (date) => {
    const day = moment(date).format('YYYY-MM-DD')
    apiRequestHandler(
      'get',
      'shifts',
      { day },
      this.props.session,
      this.storeShifts
    )
  }

  storeShifts = (response) => {
    if (response.feedback.status === 'success') {
      this.props.dispatch({
        type: 'STORE_SHIFTS',
        shifts: response.shifts,
        dailyTotals: response.dailyTotals,
      })
    }
  }

  setToToday = () => {
    this.componentWillMount()
  }

  render () {
    const {
      getShifts,
      excludeWeekend,
    } = this
    const {
      session,
      environment,
      routeData,
      timetracking,
    } = this.props || {}
    const { styles } = environment || {}
    let { day, dailyTotals } = timetracking || {}
    day = excludeWeekend(moment(day))
    const mainHeader = `${moment(day, 'YYYY-MM-DD').format('dddd, MMMM D')}`
    setWindowTitle(mainHeader, session, environment, routeData)
    return (
      <Block>
        <Block style={styles.shiftUpperNavGrid}>
          <Block/>
          <Block style={styles.alignRight}>
            <Text>Total: {dailyTotals ? moment.utc(moment.duration(dailyTotals.map(dailyTotal => dailyTotal.total).reduce((sum, value) => sum + value)) * 60 * 1000).format('HH:mm') : '00:00'}</Text>
            {' | '}
            <Link onClick={this.setToToday}>Today</Link>
          </Block>
        </Block>        
        <ShiftNav getShifts={getShifts} excludeWeekend={excludeWeekend} />
        <SectionHeader>{mainHeader}</SectionHeader>
        <ShiftsTable />
      </Block>
    )  
  }
}
const TimeTrackingBody = connect(mapStateToProps)(TimeTrackingBodyComponent)

export default TimeTrackingBody