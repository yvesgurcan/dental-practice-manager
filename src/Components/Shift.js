import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import transformArrayIntoOptions from './../Utility/transformArrayIntoOptions'
import Block from './Web/Block'
import Grid from './Grid/Grid'
import Column from './Grid/Column'
import FormGroup from './Web/Input/FormGroup'
import Button from './Web/Button'

class ShiftComponent extends Component {
  componentDidMount = () => {
    const { shift } = this.props || {}
    const { shiftTypeId, start, end} = shift || {}
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
    let updatedEnd = moment()
    this.setState({ updatedEnd })
  }
  
  calcDiff = (reference) => {
    const { shift } = this.props || {}
    const { start } = shift
    const diff = moment.duration(moment(reference).diff(moment(start)))
    return moment.utc(diff.asMilliseconds()).format('H:mm')
  }

  updateShift = () => {

  }

  render () {
    const { styles } = this.props.environment || {}
    const { shiftTypes } = this.props.settings || {}
    const { shift } = this.props || {}
    const { shiftTypeId, start, end} = shift || {}
    const { updatedEnd } = this.state || {}
    const { updateShift, calcDiff } = this || {}
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
            name='start'
            type='time'
            value={moment(start).format('HH:mm')}
            onChange={updateShift}
            onPressEnter={updateShift}
          />
        </Block>
        <Block>
          <FormGroup
              name='end'
              type='time'
              value={end ? moment(end).format('HH:mm') : undefined}
              onChange={updateShift}
              onPressEnter={updateShift}
            />
        </Block>
        <Block>
          {calcDiff(end || updatedEnd)}
        </Block>
        <Block>
          <Button hidden={end} onClick={updateShift} style={{width: '100%'}}>Stop</Button>
        </Block>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(ShiftComponent)