import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import transformObjectIntoOptions from './../Utility/transformObjectIntoOptions'
import Block from './Web/Block'
import Label from './Web/Label'
import Button from './Web/Button'
import Textbox from './Web/Input/Textbox'
import Dropdown from './Web/Input/Dropdown'
import Feedback from './Feedback'
import styles from './../Styles/styles'

// this component will be used in the settings of a particular client
class UserFormComponent extends Component {
  render () {
    return null
  }
}
const UserForm = connect(mapStateToProps)(UserFormComponent)

export default UserForm