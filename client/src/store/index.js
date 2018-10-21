//Creating the Redux Store
import { createStore, applyMiddleware, compose } from 'redux'; //createstore is used to create the store using reducers, applyMiddleware is used to apply other middlware libraries such as redux-thunk, compose is used to enhance the store with multiple middleware
import { connectRouter, routerMiddleware } from 'connected-react-router'; //Synchronize router state with redux store with uni-directional flow (history -> store -> router -> components)
import thunk from 'redux-thunk'; //redux-thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';

export const history = createHistory();

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development'){
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const createStoreWithMiddleware = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
)

export default createStoreWithMiddleware;