import { createStore, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import createHistory from 'history/createBrowserHistory'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import immutableTransform from './immutableTransform'

import reducers from '../reducers/'
import sagas from '../sagas/'

// import { hardSet } from 'redux-persist/lib/stateReconciler/hardSet'


export const history = createHistory()

const persistConfig = {
  // debug: true,
  key: 'root',
  storage,
  whitelist: ['auth'],
  transforms: [immutableTransform],
  // stateReconciler: hardSet
}

const rootReducer = persistCombineReducers(persistConfig, {
  ...reducers,
  router: routerReducer,
})

const routingMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

// Redux Dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export default () => {
  const enhancers = [
    applyMiddleware(sagaMiddleware, routingMiddleware),
  ]

  // Create store
  const store = createStore(
    rootReducer,
    composeEnhancers(...enhancers)
  )

  // Persist store
  const persistor = persistStore(store)

  // Run sagas
  sagaMiddleware.run(sagas)

  return { persistor, store }
}
