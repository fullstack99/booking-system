import { Types } from '../actions'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

const INITIAL_STATE = Immutable({
    uiLoadingIn: false,
    uiLoadingNew: false,
    token: null,
    user: null,
    error: null,
})

// AUTH
const loginAttempt = state => {
    const newState = Immutable(state)
    return newState.merge({
        uiLoadingIn: true,
    })
}

const loginAuthSuccess = (state, { auth }) => {
    return state.merge({
        user: auth.user,
        token: auth.token,
        userAppointment: auth.appointment,
        uiLoadingIn: false
    })
}

const loginUserSuccess = (state, { user }) => {
    return state.merge({
        uiLoadingIn: false,
        user: user,
    })
}

const loginFailure = (state, { error }) => {
    return state.merge({
        uiLoadingIn: false,
        error: error,
    })
}

const registerAttempt = state => {
    const newState = Immutable(state)
    return newState.merge({
        uiLoadingNew: true,
        error: INITIAL_STATE.error,
    })
}

const registerSuccess = (state, { user }) => {
    return state.merge({
        token: user.token
    })
}

const registerFailure = (state, { error }) => {
    return state.merge({
        uiLoadingNew: false,
        error: error,
    })
}

const forgotAttempt = state => {
    const newState = Immutable(state)
    return newState.merge({
        uiLoadingIn: true,
    })
}

const forgotSuccess = (state) => {
    return state.merge({
        uiLoadingIn: false,
    })
}

const forgotFailed = (state, { error }) => {
    return state.merge({
        uiLoadingIn: false,
        error: error,
    })
}

const resetAttempt = state => {
    const newState = Immutable(state)
    return newState.merge({
        uiLoadingIn: true,
    })
}

const resetSuccess = (state, { user }) => {
    return state.merge({
        uiLoadingIn: false,
        user: user,
    })
}

const resetFailed = (state, { error }) => {
    return state.merge({
        uiLoadingIn: false,
        error: error,
    })
}

const updateUserProfileRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        uiLoadingIn: true,
    })
}

const updateUserProfileSuccess = (state, { user }) => {
    return state.merge({
        uiLoadingIn: false,
        user: user,
    })
}

const updateUserProfileFailed = (state, { error }) => {
    return state.merge({
        uiLoadingIn: false,
        error: error,
    })
}

const confirmRegisterAttempt = state => {
    const newState = Immutable(state)
    return newState.merge({
        uiLoadingIn: true,
    })
}

const confirmRegisterSuccess = (state, { data }) => {
    return state.merge({
        uiLoadingIn: false,
        user: data.user,
        token: data.token
    })
}

const confirmRegisterFailed = (state, { error }) => {
    return state.merge({
        uiLoadingIn: false,
        error: error,
    })
}

const removeUserAppointment = (state) => {
    const newState = Immutable(state)
    return newState.merge({
        userAppointment: null,
    })
}

const setUserAppointment = (state, { booking }) => {
    console.log(state);
    console.log(booking);
    const newState = Immutable(state)
    return newState.merge({
        userAppointment: booking,
    })
}

const getUserInfoRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
    })
}

const getUserInfoSuccess = (state, { user }) => {
    return state.merge({
        user: user,
        isFetching: false,
        isFetched: true
    })
}

const getUserInfoFailed =  (state, { error }) => {
    return state.merge({
        isFetching: false,
        isFetched: true,
        error: error,
    })
}

const logout = state => INITIAL_STATE

// map our types to our handlers
const ACTION_HANDLERS = {
    // AUTH
    [Types.LOGIN_ATTEMPT]: loginAttempt,
    [Types.LOGIN_AUTH_SUCCESS]: loginAuthSuccess,
    [Types.LOGIN_USER_SUCCESS]: loginUserSuccess,
    [Types.LOGIN_FAILURE]: loginFailure,
    [Types.REGISTER_ATTEMPT]: registerAttempt,
    [Types.REGISTER_SUCCESS]: registerSuccess,
    [Types.REGISTER_FAILURE]: registerFailure,
    [Types.FORGOT_ATTEMPT]: forgotAttempt,
    [Types.FORGOT_SUCCESS]: forgotSuccess,
    [Types.FORGOT_FAILED]: forgotFailed,
    [Types.RESET_ATTEMPT]: resetAttempt,
    [Types.RESET_SUCCESS]: resetSuccess,
    [Types.RESET_FAILED]: resetFailed,
    [Types.UPDATE_USER_PROFILE_REQUEST]: updateUserProfileRequest,
    [Types.UPDATE_USER_PROFILE_SUCCESS]: updateUserProfileSuccess,
    [Types.UPDATE_USER_PROFILE_FAILED]: updateUserProfileFailed,
    [Types.CONFIRM_REGISTER_ATTEMPT]: confirmRegisterAttempt,
    [Types.CONFIRM_REGISTER_SUCCESS]: confirmRegisterSuccess,
    [Types.CONFIRM_REGISTER_FAILED]: confirmRegisterFailed,
    [Types.REMOVE_USER_APPOINTMENT]: removeUserAppointment,
    [Types.SET_USER_APPOINTMENT]: setUserAppointment,
    [Types.GET_USER_INFO_REQUEST]: getUserInfoRequest,
    [Types.GET_USER_INFO_SUCCESS]: getUserInfoSuccess,
    [Types.GET_USER_INFO_FAILED]: getUserInfoFailed,
    // Reset
    [Types.LOGOUT]: logout,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
