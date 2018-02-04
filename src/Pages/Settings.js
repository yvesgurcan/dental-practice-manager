import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import SettingsBody from './../Components/Content/Settings/SettingsBody'
import PageWrapper from './../Components/PageWrapper'

class SettingsComponent extends Component {
  render () {
    return (
      <PageWrapper route="/settings" menuRoute="/settings">
        <SettingsBody />
      </PageWrapper>
    )  
  }
}
const Settings = connect(mapStateToProps)(SettingsComponent)

export default Settings