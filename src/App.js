import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import store from './Store/store'
import mapStateToProps from './Store/mapStateToProps'
import checkUserPermissions from './Utility/checkUserPermissions'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'

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
    let {user} = session
    if (!user) {
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
          {
            this.filterSubRoutes().map(subroute => <Route key={subroute.url} path={subroute.url} component={subroute.component} />)
          }
          {
            checkUserPermissions(routes, user).map(route => <Route exact={routes[route].notFoundComponent ? true : false} key={routes[route].url} path={routes[route].url} component={routes[route].component} />)
          }
          {
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
