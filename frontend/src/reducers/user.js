import { Types } from '../actions'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
const _ = require('lodash');

const INITIAL_STATE = Immutable({
    type: '',
    location: '',
    appointment: '',
    booking: null,
    error: null,
    isFetching: false,
    isFetched: false,
    appointments: [],
    updatedAppointment: [],
    updateFlag: null,
    users: [],
    userInfo: null,
    bookingDate: null,
    bookingTime: null,
    bookings: [],
    reschedule: false
})


const setSubscriptionType = (state, { type, data }) => {
    return state.merge({
        type: data.type,
        location: data.location
    })
}

const setAppointment = (state, { type, value }) => {
    return state.merge({
        appointment: value.appointment
    })
}

const pickDate = (state, { type, data }) => {
    console.log(data)
    return state.merge({
        bookingDate: data.date,
        bookingTime: data.time
    })
}

const bookingSuccess = (state, { booking }) => {
    return state.merge({
        booking: booking,
        bookingDate: null,
        bookingTime: null
    })
}

const bookingFailure = (state, { error }) => {
    return state.merge({
        error: error,
    })
}

const getAppointmentRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
    })
}

const getAppointmentSuccess = (state, { appointments }) => {
    return state.merge({
        appointments: appointments,
        isFetching: false,
        isFetched: true
    })
}

const getAppointmentFailed =  (state, { error }) => {
    return state.merge({
        isFetching: false,
        isFetched: true,
        error: error,
    })
}


const getBookingDatesRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
    })
}

const getBookingDatesSuccess = (state, { bookings }) => {
    return state.merge({
        bookings: bookings,
        isFetching: false,
        isFetched: true
    })
}

const getBookingDatesFailed =  (state, { error }) => {
    return state.merge({
        isFetching: false,
        isFetched: true,
        error: error,
    })
}


const updateAppointmentStatusRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
        updateFlag: null
    })
}

const updateAppointmentStatusSuccess = (state, { appointment }) => {
    const newAppointments = state.appointments.map(item => {
        if (item._id === appointment._id) {
            return appointment
        }
        return item
    })

    return state.merge({
        updateFlag: true,
        appointments: newAppointments,
        isFetching: false,
        isFetched: true
    })
}

const updateAppointmentStatusFailed = (state, { error }) => {
    return state.merge({
        isFetching: false,
        isFetched: true,
        error: error,
        updateFlag: false
    })
}

const getUsersRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
        users: []
    })
}

const getUsersSuccess = (state, { users }) => {
    return state.merge({
        users: users,
        isFetching: false,
        isFetched: true
    })
}

const getUsersFailed =  (state, { error }) => {
    return state.merge({
        isFetching: false,
        isFetched: true,
        error: error,
    })
}


const updateUserInfoRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
    })
}

const updateUserInfoSuccess = (state, { user }) => {
    return state.merge({
        userInfo: user,
        isFetching: false,
        isFetched: true
    })
}

const updateUserInfoFailed =  (state, { error }) => {
    return state.merge({
        isFetching: false,
        isFetched: true,
        error: error,
    })
}


const confirmAttempt = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
    })
}

const confirmSuccess = (state) => {
    return state.merge({
        confirmedAppointment: true,
        isFetching: false,
        isFetched: true
    })
}

const confirmFailed =  (state, { error }) => {
    return state.merge({
        confirmedAppointment: false,
        isFetching: false,
        isFetched: true,
        error: error
    })
}

const cancelAppointmentRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
        cancelAppointment: true,
    })
}

const cancelAppointmentSuccess = (state) => {
    return state.merge({
        booking: null,
        cancelAppointment: false,
        isFetching: false,
        isFetched: true
    })
}

const cancelAppointmentFailed =  (state, { error }) => {
    return state.merge({
        cancelAppointment: false,
        isFetching: false,
        isFetched: true,
        error: error
    })
}

const sendEmailRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
    })
}

const sendEmailSuccess = (state) => {
    return state.merge({
        isFetching: false,
        isFetched: true
    })
}

const sendEmailFailed =  (state, { error }) => {
    return state.merge({
        isFetching: false,
        isFetched: true,
        error: error
    })
}

const setReschedule = (state) => {
    return state.merge({
        reschedule: true
    })
}

const getUserDetailInfoRequest = state => {
    const newState = Immutable(state)
    return newState.merge({
        isFetching: true,
        userInfo: null
    })
}

const getUserDetailInfoSuccess = (state, { user }) => {
    return state.merge({
        userInfo: user,
        isFetching: false,
        isFetched: true
    })
}

const getUserDetailInfoFailed =  (state, { error }) => {
    return state.merge({
        isFetching: false,
        isFetched: true,
        error: error,
    })
}

// map our types to our handlers
const ACTION_HANDLERS = {
    [Types.SET_SUBSCRIPTION_TYPE]: setSubscriptionType,
    [Types.PICK_DATE]: pickDate,
    [Types.SET_APPOINTMENT]: setAppointment,
    [Types.BOOKING_SUCCESS]: bookingSuccess,
    [Types.BOOKING_FAILURE]: bookingFailure,
    [Types.GET_APPOINTMENT_REQUEST]: getAppointmentRequest,
    [Types.GET_APPOINTMENT_SUCCESS]: getAppointmentSuccess,
    [Types.GET_APPOINTMENT_FAILED]: getAppointmentFailed,
    [Types.GET_BOOKING_DATES_REQUEST]: getBookingDatesRequest,
    [Types.GET_BOOKING_DATES_SUCCESS]: getBookingDatesSuccess,
    [Types.GET_BOOKING_DATES_FAILED]: getBookingDatesFailed,
    [Types.UPDATE_APPOINTMENT_STATUS_REQUEST]: updateAppointmentStatusRequest,
    [Types.UPDATE_APPOINTMENT_STATUS_SUCCESS]: updateAppointmentStatusSuccess,
    [Types.UPDATE_APPOINTMENT_STATUS_FAILED]: updateAppointmentStatusFailed,
    [Types.GET_USERS_REQUEST]: getUsersRequest,
    [Types.GET_USERS_SUCCESS]: getUsersSuccess,
    [Types.GET_USERS_FAILED]: getUsersFailed,
    [Types.UPDATE_USER_INFO_REQUEST]: updateUserInfoRequest,
    [Types.UPDATE_USER_INFO_SUCCESS]: updateUserInfoSuccess,
    [Types.UPDATE_USER_INFO_FAILED]: updateUserInfoFailed,
    [Types.CONFIRM_ATTEMPT]: confirmAttempt,
    [Types.CONFIRM_SUCCESS]: confirmSuccess,
    [Types.CONFIRM_FAILED]: confirmFailed,
    [Types.CANCEL_APPOINTMENT_REQUEST]: cancelAppointmentRequest,
    [Types.CANCEL_APPOINTMENT_SUCCESS]: cancelAppointmentSuccess,
    [Types.CANCEL_APPOINTMENT_FAILED]: cancelAppointmentFailed,
    [Types.SEND_EMAIL_REQUEST]: sendEmailRequest,
    [Types.SEND_EMAIL_SUCCESS]: sendEmailSuccess,
    [Types.SEND_EMAIL_FAILED]: sendEmailFailed,
    [Types.SET_RESCHEDULE]: setReschedule,
    [Types.GET_USER_DETAIL_INFO_REQUEST]: getUserDetailInfoRequest,
    [Types.GET_USER_DETAIL_INFO_SUCCESS]: getUserDetailInfoSuccess,
    [Types.GET_USER_DETAIL_INFO_FAILED]: getUserDetailInfoFailed,


}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
