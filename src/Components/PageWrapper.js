import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import getRouteDetails from './../Utility/getRouteDetails'
import Block from './Web/Block'
import PageHeader from './Web/PageHeader'
import Nav from './Nav/Nav'
import NavButton from './Nav/NavButton'
import Feedback from './Feedback'
import ContentWrapper from './ContentWrapper'

class PageWrapperComponent extends Component {
  render () {
    const { styles } = this.props.environment
    const {path} = this.props.routeData || {}
    const {environment, route, menuRoute, notFound, pageTitle} = this.props
    const {viewport, routes, showNav} = environment
    const routeDetails = getRouteDetails(routes, route || path)
    const pageHeader = pageTitle || (routeDetails ? routeDetails.name : null)
    const subRoutes = getRouteDetails(routes, menuRoute, "subroutes")
    const subRouteHome = getRouteDetails(routes, menuRoute)
    return (
      <Block>
        <NavButton />
        {viewport.tablet && !showNav ? null : <Nav/>}
        <ContentWrapper menu={subRoutes} subRouteHome={subRouteHome}>
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