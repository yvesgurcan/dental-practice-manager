import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PageWrapper from './../Components/PageWrapper'
import HomeBody from './../Components/Content/Home/HomeBody'

class NotFoundComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
    <PageWrapper notFound="The page you are looking for could not be found.">
      <HomeBody />
    </PageWrapper>
    )  
  }
}
const NotFound = connect(mapStateToProps)(NotFoundComponent)

export default NotFound