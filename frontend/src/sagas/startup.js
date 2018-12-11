import { take, select } from 'redux-saga/effects'
import { Types } from '../actions'
import { REHYDRATE } from 'redux-persist'

const getToken = state => state.auth.token


export default api => {
	// Booting
	function* bootingFlow() {
		while (true) {
			yield take([
				REHYDRATE,
				Types.LOGIN_AUTH_SUCCESS,
				Types.LOGIN_USER_SUCCESS,
			])
			let token = yield select(getToken)

			// Start booting
			if (token) {
				api.setAuthHeader(token)
			}
		}
	}

	return {
		bootingFlow,
	}
}
