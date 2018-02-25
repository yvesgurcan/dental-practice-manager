import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import transformArrayIntoOptions from './../Utility/transformArrayIntoOptions'
import Block from './Web/Block'
import Grid from './Grid/Grid'
import FormGroup from './Web/Input/FormGroup'
import Button from './Web/Button'
import DangerButton from './Web/DangerButton'

class ShiftComponent extends Component {
  componentDidMount = () => {
    const { shift } = this.props || {}
    const { end } = shift || {}
    if (!end) {
      const millisecondsToNextMinute = moment.duration(moment().endOf('minute').diff(moment())).asMilliseconds()
      this.timeout = setTimeout(this.firstUpdateActiveTimer, millisecondsToNextMinute)
    }

  }

  firstUpdateActiveTimer = () => {
    this.updateActiveTimer()
    this.interval = setInterval(this.updateActiveTimer, 60000)
  }

  updateActiveTimer = () => {
    let ongoingEnd = moment()
    this.setState({ ongoingEnd })
  }
  
  calcDiff = (reference) => {
    const { shift } = this.props || {}
    const { start } = shift
    const { updatedStart } = this.state || {}
    const diff = moment.duration(moment(reference).diff(moment(updatedStart || start)))

    console.log(diff)

    if (diff < 0) {
      return '-'
    }

    return moment.utc(diff.asMilliseconds()).format('H:mm')
  }

  updateShift = (input) => {
    const { day } = this.props.timetracking || {}
    let state = {...this.state}
    // TODO: add input.value in a way that is moment-compatible
    state[input.name] = moment(day).startOf('day').format('YYY-MM-DD HH:mm')
    this.setState(state, () => {
      const { updatedEnd } = this.state || {}
      this.calcDiff(updatedEnd)
    })
  }

  deleteShift = () => {

  }

  render () {
    const { styles, viewport } = this.props.environment || {}
    const { mobile } = viewport
    const { shiftTypes } = this.props.settings || {}
    const { shift } = this.props || {}
    const { shiftTypeId, start, end} = shift || {}
    const { updatedStart, updatedEnd, ongoingEnd } = this.state || {}
    const { updateShift, deleteShift, calcDiff } = this || {}
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
          {calcDiff(end || ongoingEnd)}
        </Block>
        <Block>
          <Button hidden={end} onClick={updateShift} style={{width: '100%'}}>Stop</Button>
        </Block>
        <Block>
          <DangerButton onClick={deleteShift} style={{width: '100%'}}>Delete</DangerButton>
        </Block>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(ShiftComponent)