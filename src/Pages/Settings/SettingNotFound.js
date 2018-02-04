import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageWrapper from './../../Components/PageWrapper'
import SettingsBody from './../../Components/Content/Settings/SettingsBody'

class SettingsComponent extends Component {
  render () {
    return (
      <PageWrapper route="/settings" menuRoute="/settings" notFound="The setting you are looking for could not be found.">
        <SettingsBody />
      </PageWrapper>
    )  
  }
}
const Settings = connect(mapStateToProps)(SettingsComponent)

export default Settings