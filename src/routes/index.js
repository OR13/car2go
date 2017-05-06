// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'

import DebugRoute from './Debug'
import TransferRoute from './Transfer'

import HomeRoute from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import ProjectsRoute from './Projects'
import AccountRoute from './Account'
import RecoverRoute from './Recover'
import TodoRoute from './Todo'

import AdminRoute from './Admin'
import CreateFaucetRoute from './CreateFaucet'
import FaucetRoute from './Faucet'
import AuthorizeFaucetRoute from './AuthorizeFaucet'



/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    AccountRoute(store),
    LoginRoute(store),
    SignupRoute(store),
    ProjectsRoute(store),
    RecoverRoute(store),
    TransferRoute(store),
    DebugRoute(store),
    TodoRoute(store),
    AdminRoute(store),
    CreateFaucetRoute(store),
    FaucetRoute(store),
    AuthorizeFaucetRoute(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
