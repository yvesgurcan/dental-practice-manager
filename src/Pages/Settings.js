import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import SettingsBody from './../Components/Content/Settings/SettingsBody'
import PageWrapper from './../Components/PageWrapper'

class SettingsComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PageWrapper menuRoute="/settings">
        <SettingsBody />
      </PageWrapper>
    )  
  }
}
const Settings = connect(mapStateToProps)(SettingsComponent)

export default Settings