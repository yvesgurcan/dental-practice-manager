import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import getRouteDetails from './../Utility/getRouteDetails'
import styles from './../Styles/styles'
import Block from './Web/Block'
import PageHeader from './Web/PageHeader'
import Nav from './Nav'
import Feedback from './Feedback'
import ContentWrapper from './ContentWrapper'

class PageWrapperComponent extends Component {
  render () {
    const {environment, route, menuRoute, notFound, pageTitle} = this.props
    const {routes} = environment
    const routeDetails = getRouteDetails(routes, route)
    const pageHeader = pageTitle || (routeDetails ? routeDetails.name : null)
    const subRoutes = getRouteDetails(routes, menuRoute, "subroutes")
    return (
      <Block>
        <Nav/>
        <ContentWrapper menu={subRoutes}>
          <Block style={styles.spacer}>
            <Feedback feedback={{status: "error", message: notFound}} />
          </Block>
          <PageHeader>{pageHeader}</PageHeader>
          {this.props.children}
        </ContentWrapper>
      </Block>
    )  
  }
}
const PageWrapper = connect(mapStateToProps)(PageWrapperComponent)

export default PageWrapper