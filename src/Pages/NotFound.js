import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageHeader from './../Components/Web/PageHeader'
import PageWrapper from './../Components/PageWrapper'
import Home from './../Pages/Home'

class NotFoundComponent extends Component {
  render () {
    const {name} = this.props.session.user
    return (
      <Home/>
    )  
  }
}
const NotFound = connect(mapStateToProps)(NotFoundComponent)

export default NotFound