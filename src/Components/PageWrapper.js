import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import getRouteDetails from './../Utility/getRouteDetails'
import setWindowTitle from './../Utility/setWindowTitle'
import Block from './Web/Block'
import PageHeader from './Web/PageHeader'
import Nav from './Nav/Nav'
import NavButton from './Nav/NavButton'
import Feedback from './Feedback'
import ContentWrapper from './ContentWrapper'

class PageWrapperComponent extends Component {
  render () {
    const {
      session,
      environment,
      route,
      routeData,
      pageTitle,
      menuRoute,
      notFound,
      setWindowTitleAutomatically
    } = this.props || {}
    const {
      styles,
      viewport,
      routes,
      showNav,
    } = environment || {}
    const { path } = routeData || {}
    const routeDetails = getRouteDetails(routes, route || path)
    const pageHeader = pageTitle === null ? undefined : pageTitle || (routeDetails || {}).name
    if (setWindowTitleAutomatically) {
      setWindowTitle(undefined, pageHeader, session, environment)
    }

    const subRoutes = getRouteDetails(routes, menuRoute, "subroutes")
    const subRouteHome = getRouteDetails(routes, menuRoute)
    return (
      <Block>
        <NavButton />
        {viewport.menu && !showNav ? null : <Nav/>}
        <ContentWrapper menu={subRoutes} subRouteHome={subRouteHome}>
          <Block style={styles.spacer}>
            <Feedback feedback={{status: "error", message: notFound}} />
          </Block>
          {!pageHeader ? null : <PageHeader>{pageHeader}</PageHeader>}
          {this.props.children}
        </ContentWrapper>
      </Block>
    )  
  }
}

PageWrapperComponent.defaultProps = {
  setWindowTitleAutomatically: true,
}

const PageWrapper = connect(mapStateToProps)(PageWrapperComponent)

export default PageWrapper
