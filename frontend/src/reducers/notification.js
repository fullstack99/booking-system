import { Types } from '../actions'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({
	message: '',
	level: null, // success or error
})

const setNotification = (state, { message, level }) => {
	return state.merge({
		message: message,
		level: level,
	})
}

const clearNotification = state => INITIAL_STATE

// map our types to our handlers
const ACTION_HANDLERS = {
	[Types.SET_NOTIFICATION]: setNotification,
	[Types.CLEAR_NOTIFICATION]: clearNotification,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
