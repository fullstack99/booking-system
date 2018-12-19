// @flow

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore, { history } from './config/store'
import Index from './containers/Index'

const { persistor, store } = configureStore()

const App = () => (
	<Provider store={store}>
		<PersistGate
			loading="Loading..."
			// TODO take some action before the gate lifts ???
			// onBeforeLift
			persistor={persistor}
		>
			<ConnectedRouter history={history}>
				<Index />
			</ConnectedRouter>
		</PersistGate>
	</Provider>
)

const rootElement = document.querySelector('#root')

if (rootElement) {
	render(<App />, rootElement)
}
