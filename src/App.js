import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import store from './Store/store'
import mapStateToProps from './Store/mapStateToProps'
import checkUserPermissions from './Utility/checkUserPermissions'
import SignIn from './Pages/SignIn'
import ForgotPassword from './Pages/ForgotPassword'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Support from './Pages/Support'

const Root = () => (
  <Provider store={store}>
    <App/>
  </Provider>
)

class AppComponent extends Component {
  state = {preventSignInRedirect: true}
  componentWillMount () {
    this.props.dispatch({type: "GET_LOCALSTORAGE_USER"})
    this.props.dispatch({type: "GET_LOCALSTORAGE_CLIENT"})
    this.props.dispatch({type: "GET_LOCALSTORAGE_SUPPORTUSER"})
    this.props.dispatch({ type: 'GET_MAX_USERS' })
    window.addEventListener("resize", this.storeStyles, false)
    this.storeStyles()
  }
  storeStyles = () => {
    this.props.dispatch({type: "STORE_STYLES", window: {height: window.innerHeight, width: window.innerWidth}})
  }
  componentWillUpdate (nextProps, nextState) {
    if (nextProps.session.user === undefined && nextState.preventSignInRedirect) {
      this.setState({preventSignInRedirect: false})
    }
    else if (this.props.session.supportUser === undefined && nextState.preventSignInRedirect) {
      this.setState({preventSignInRedirect: false})
    }

  }
  componentDidUpdate () {
    if (this.state.preventSignInRedirect) {
      this.setState({preventSignInRedirect: false})
    }

  }
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
            <Route path='/signIn/help' component={ForgotPassword} />
            <Route path='/signIn' component={SignIn} />
            {this.state.preventSignInRedirect ? null : <Route path='/' render={() => (
              <Redirect to='/signIn'/>
            )} />}
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
          <Route path='/signIn' render={() => (
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
