import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import Block from './Web/Block'
import Label from './Web/Label'
import Button from './Web/Button'
import SectionHeader from './Web/SectionHeader'
import Textbox from './Web/Input/Textbox'
import Feedback from './Feedback'
import styles from './../Styles/styles'

class NewClientFormComponent extends Component {
  storeClient = (input) => {
    this.props.dispatch({type: "STORE_NEW_CLIENT", ...input})
  }
  createClient = () => {
    const {newClient} = this.props.support
    if (!newClient) {
      this.props.dispatch({
        type: "NEW_CLIENT_FEEDBACK",
        feedback: {
          form: {
            message: "Please enter the name of the client.",
            status: "validationError",
          },
        },
      })
      return false
    }

    let validationError = false

    this.props.dispatch({type: "CLEAR_NEW_CLIENT_FEEDBACK"})
    if (!newClient.name) {
      validationError = true
      this.props.dispatch({
        type: "NEW_CLIENT_FEEDBACK",
        feedback: {
          name: {
            message: "Please enter the name of the client.",
            status: "validationError",
          },
        },
      })
    }
    
    if (!validationError) {
      apiRequestHandler(
        "post",
        "clients",
        {newClient},
        this.props.session,
        this.handleNewClientResponse
      )  
    }

  }
  handleNewClientResponse = (response) => {
    if (response.feedback.status === "success") {
      this.props.dispatch({type: "ADD_CLIENT", newClient: {...response.newClient}})
      this.props.dispatch({type: "CLEAR_NEW_CLIENT_FORM", newUser: {...response.newClient}})
      this.props.dispatch({type: "NEW_CLIENT_FEEDBACK", feedback: {form: {...response.feedback}}})
    }
    else {
      this.props.dispatch({type: "CLEAR_NEW_CLIENT_FEEDBACK"})
      this.props.dispatch({type: "NEW_CLIENT_FEEDBACK", feedback: {form: {...response.feedback}}})
    }
  }
  render () {
    const {newClient, newClientFeedback} = this.props.support
    return (
      <Block style={styles.newUserForm}>
        <SectionHeader>New Client</SectionHeader>
        <Block>
          <Label>Name</Label>
          <Block>
            <Textbox name="name" value={(newClient || {}).name} onChange={this.storeClient} onPressEnter={this.createClient} style={{width: "100%"}}  />
          </Block>
          <Feedback feedback={(newClientFeedback || {}).name} />
          <Feedback feedback={(newClientFeedback || {}).form} />
          <Button onClick={this.createClient}>Add Client</Button>
        </Block>
      </Block>
    )
  }
}
const NewClientForm = connect(mapStateToProps)(NewClientFormComponent)

export default NewClientForm