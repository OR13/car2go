import { TODO_PATH as path } from 'constants/paths'

export default (store) => ({
  path,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const TodoContainer = require('containers/Todo/TodoContainer').default

      /*  Return getComponent   */
      cb(null, TodoContainer)

    /* Webpack named bundle   */
    }, 'TodoContainer')
  }
})
