import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageHeader from './../Components/Web/PageHeader'
import PageWrapper from './../Components/PageWrapper'
import HomeBody from './../Components/Content/Home/HomeBody'
import Block from './../Components/Web/Block'

class NotFoundComponent extends Component {
  render () {
    const {name} = this.props.session.user
    return (
    <PageWrapper notFound="The page you are looking for could not be found.">
      <HomeBody />
    </PageWrapper>
    )  
  }
}
const NotFound = connect(mapStateToProps)(NotFoundComponent)

export default NotFound