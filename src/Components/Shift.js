import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from '../Utility/apiRequestHandler'
import transformArrayIntoOptions from './../Utility/transformArrayIntoOptions'
import Block from './Web/Block'
import Grid from './Grid/Grid'
import FormGroup from './Web/Input/FormGroup'
import Button from './Web/Button'
import DangerButton from './Web/DangerButton'

class ShiftComponent extends Component {
  componentDidMount = () => {
    this.mounted = true
    const { shift } = this.props || {}
    const { end } = shift || {}
    if (!end) {
      this.setState({ ongoingEnd: moment() })
      const millisecondsToNextMinute = moment.duration(moment().endOf('minute').diff(moment())).asMilliseconds()
      this.timeout = setTimeout(this.firstUpdateActiveTimer, millisecondsToNextMinute)
    }

  }

  firstUpdateActiveTimer = () => {
    this.updateActiveTimer()
    this.interval = setInterval(this.updateActiveTimer, 60000)
  }

  updateActiveTimer = () => {
    if (this.mounted) {
      let ongoingEnd = moment()
      this.setState({ ongoingEnd })  
    }
  }
  
  calcDiff = (reference) => {
    const { day } = this.props.timetracking || {}
    const { shift } = this.props || {}
    const { start, end } = shift
    const { updatedStart, updatedEnd } = this.state || {}
    if (!end && !updatedEnd && moment().isAfter(moment(day).endOf('day'))) {
      return '-'
    }

    const diff = moment.duration(moment(reference).diff(moment(updatedStart || start)))

    if (diff < 0) {
      return '-'
    }

    return moment.utc(diff.asMilliseconds()).format('H:mm')
  }

  updateShift = (input) => {
    const { day } = this.props.timetracking || {}
    const { shift } = this.props || {}
    const formattedDay = moment(day).format('YYYY-MM-DD')
    let state = {...this.state}
    let { name, value } = input
    if (!value) {
      name = 'updatedEnd'
      if (moment().isAfter(moment(day).endOf('day'))) {
        const { scheduleEnd } = this.props.settings || {}
        if (scheduleEnd) {
          value = scheduleEnd
        }
        else {
          value = '23:59'
        }
      }
      else {
        value = moment().format('HH:mm')
      }
    }
    const newValue = moment(`${formattedDay} ${value}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm')
    state[name] = newValue
    this.setState(state, () => {
      const { updatedEnd } = this.state || {}
      this.calcDiff(updatedEnd)
      let key = name.replace('updated','')
      key = key[0].toLowerCase() + key.substring(1)
      const updateShift = {
        shiftId: shift.shiftId,
        [key]: newValue,
      }
      apiRequestHandler(
        'put',
        'shifts',
        { updateShift },
        this.props.session,
      )
    })
  }

  resumeShift = () => {
    this.updateShift({name: 'updatedEnd', value: undefined})
  }

  deleteShift = () => {
    const { shift } = this.props || {}
    this.props.dispatch({ type: 'DELETE_SHIFT', shiftId: shift.shiftId})
    apiRequestHandler(
      'delete',
      'shifts',
      { deleteShift: {shiftId: shift.shiftId} },
      this.props.session,
      this.props.handleDeleteShiftResponse
    )
  }

  handleDeleteShiftResponse = () => {
  }

  componentWillUnmount = () => {
    this.mounted = false
  }

  render () {
    const { shift, environment, settings, timetracking } = this.props || {}
    const { styles, viewport } = environment || {}
    const { mobile } = viewport
    const { shiftTypes } = settings || {}
    const { day } = timetracking || {}
    const { shiftTypeId, start, end} = shift || {}
    const { updatedStart, updatedEnd, ongoingEnd } = this.state || {}
    const { updateShift, resumeShift, deleteShift, calcDiff } = this || {}
    const today = moment().startOf('day').format('YYYY-MM-DD')
    return (
      <Grid style={styles.shiftGrid}>
        <Block>
          <FormGroup
            name='shiftTypeName'
            value={shiftTypeId}
            options={transformArrayIntoOptions(shiftTypes, {value: 'shiftTypeId', label: 'shiftTypeName'})}
            onChange={updateShift}
          />
        </Block>
        <Block>
          <FormGroup
            name='updatedStart'
            type='time'
            value={updatedStart && moment(updatedStart).isValid ? moment(updatedStart).format('HH:mm') : moment(start).format('HH:mm')}
            onChange={updateShift}
            onPressEnter={updateShift}
          />
        </Block>
        <Block>
          <FormGroup
              name='updatedEnd'
              type='time'
              value={updatedEnd && moment(updatedEnd).isValid ? moment(updatedEnd).format('HH:mm') : end ? moment(end).format('HH:mm') : undefined}
              onChange={updateShift}
              onPressEnter={updateShift}
            />
        </Block>
        <Block style={mobile ? styles.standardMargin : null}>
          {calcDiff(updatedEnd || end || ongoingEnd)}
        </Block>
        <Block hidden={end || updatedEnd}>
          <Button onClick={updateShift} style={{width: '100%'}}>Stop</Button>
        </Block>
        <Block hidden={!end && !updatedEnd}>
          <Button hidden={!moment(today).isSame(moment(day).format('YYYY-MM-DD'))} onClick={resumeShift} style={{width: '100%'}}>Start</Button>
        </Block>
        <Block>
          <DangerButton onClick={deleteShift} style={{width: '100%'}}>Delete</DangerButton>
        </Block>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(ShiftComponent)