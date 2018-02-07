import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import store from './Store/store'
import mapStateToProps from './Store/mapStateToProps'
import checkUserPermissions from './Utility/checkUserPermissions'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Support from './Pages/Support'

const Root = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

class AppComponent extends Component {
  filterSubRoutes = () => {
    let {environment, session} = this.props
    let {routes} = environment
    let {user} = session
    const routesWithSubRoutes = checkUserPermissions(routes, user).filter(route => routes[route].subroutes)
    const subRoutes = routesWithSubRoutes.map(route => Object.keys(routes[route].subroutes).map(subroute => routes[route].subroutes[subroute]))
    const flatArray = []
    subRoutes.map(route => {
      route.map(subroute => {
        flatArray.push(subroute)
        return null
      })
      return null
    })
    return flatArray
  }
  render () {
    let {environment, session} = this.props
    let {routes} = environment
    let {user, supportUser} = session
    if (supportUser && !user) {
      return (
        <Router>
        <Switch>
          <Route path='/support' component={Support} />
          <Route path='/' render={() => (
              <Redirect to='/support'/>
            )} />
        </Switch>
      </Router>
      )
    }
    if (!user && !supportUser) {
      return (
        <Router>
          <Switch>
            <Route path='/signin' component={SignIn} />
            <Route path='/' render={() => (
              <Redirect to='/signin'/>
            )} />
          </Switch>
        </Router>
      )
    }
    return (
      <Router>
        <Switch>
          {supportUser ? <Route exact path='/support' component={Support} /> : null}
          {
            /* id subroutes */
            this.filterSubRoutes().filter(subroute => subroute.idRoute).map(subroute => <Route key={subroute.idRoute.url} exact path={subroute.idRoute.url} component={subroute.idRoute.component} />)
          }
          {
            /* subroutes */
            this.filterSubRoutes().map(subroute => <Route key={subroute.url} path={subroute.url} component={subroute.component} />)
          }
          {
            /* id routes */
            checkUserPermissions(routes, user).filter(route => routes[route].idRoute).map(route => <Route key={routes[route].idRoute.url} path={routes[route].idRoute.url} component={routes[route].idRoute.component} />)
          }
          {
            /* routes */
            checkUserPermissions(routes, user).map(route => <Route exact={routes[route].notFoundComponent ? true : false} key={routes[route].url} path={routes[route].url} component={routes[route].component} />)
          }
          {
            /* not found routes */
            checkUserPermissions(routes, user).filter(route => routes[route].notFoundComponent).map(route => <Route key={routes[route].url} path={routes[route].url} component={routes[route].notFoundComponent}/>)
          }
          <Route path='/signin' render={() => (
            <Redirect to='/'/>
          )} />
          <Route exact path='/(home|index|)/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}
const App = connect(mapStateToProps)(AppComponent)

export default Root
