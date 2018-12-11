import { fork, takeLatest, put } from 'redux-saga/effects'
import { Creators as Actions } from '../actions'


export default api => {
	// Unauthorized
	function* watchUnauthorized({ status }) {
		if (status === 401) {
			// TODO catch 401 error for reauthenticate modal
			yield put(Actions.logout())
		}
	}

	// Notify user
	function* watchNotification({ error, success }) {
		if (error) {
			yield put(Actions.setNotification(error, 'error'))
		} else if (success) {
			yield put(Actions.setNotification(success, 'success'))
		}
	}

	function* watchersFlow() {
		yield fork(takeLatest, '*', watchUnauthorized)
		yield fork(takeLatest, '*', watchNotification)
	}

	return {
		watchersFlow,
	}
}
