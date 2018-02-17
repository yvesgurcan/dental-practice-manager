import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../Web/Block'
import Label from './../Web/Label'
import FormGroup from './../Web/Input/FormGroup'

class ScheduleBoundariesComponent extends Component {
  storeScheduleBoundaries = (input) => {
    this.props.dispatch({type: 'STORE_SCHEDULE_BOUNDARIES', ...input})
  }

  render () {
    const { styles, regex, weekdays } = this.props.environment || {}
    const { daysOpen, scheduleStart, scheduleEnd, appointmentLength, newScheduleBoundariesFeedback } = this.props.settings || {}
    return (
      <Block style={styles.formWrapper}>
        <Block style={styles.standardMargin}>
          <Label>Which days of the week is your practice open?</Label>
          {
            weekdays.map(day => (
              <FormGroup
                key={day.name}
                checkbox
                label={day.name}
                name="daysOpen"
                id={day.name}
                value={(daysOpen || []).filter(dayOpen => dayOpen === day.name).length > 0}
                onChange={this.storeScheduleBoundaries}
                feedback={(newScheduleBoundariesFeedback || {}).weekdays}
              />            
            ))
          }
        </Block>
        <FormGroup
          label='Start of first appointment'
          name='scheduleStart'
          type="time"
          value={scheduleStart}
          onChange={this.storeScheduleBoundaries}
          onPressEnter={this.storeScheduleBoundaries}
          feedback={(newScheduleBoundariesFeedback || {}).scheduleStart}
        />
        <FormGroup
          label='End of last appointment'
          name='scheduleEnd'
          type="time"
          value={scheduleEnd}
          onChange={this.storeScheduleBoundaries}
          onPressEnter={this.storeScheduleBoundaries}
          feedback={(newScheduleBoundariesFeedback || {}).scheduleEnd}
        />
        <FormGroup
          label='Appointment length (in minutes)'
          name='appointmentLength'
          type="number"
          pattern={regex.positiveNumbers}
          maxLength={2}
          max={60}
          value={appointmentLength}
          onChange={this.storeScheduleBoundaries}
          onPressEnter={this.storeScheduleBoundaries}
          feedback={(newScheduleBoundariesFeedback || {}).appointmentLength}
        />
      </Block>
    )
  }
}
const ScheduleBoundaries = connect(mapStateToProps)(ScheduleBoundariesComponent)

export default ScheduleBoundaries