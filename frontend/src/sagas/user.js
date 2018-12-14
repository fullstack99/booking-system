import { path } from 'ramda';
import { push } from 'react-router-redux';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import { Creators as Actions, Types } from '../actions';

// import { delay } from 'redux-saga'

export default api => {
	function* booking() {
        const state = yield select();
        const data = state.user;
        const user = state.auth.user;
        let error = 'Something went wrong.'
        console.log('data', data);
        console.log('user', user)
        if (user) {
            let bookingId;
            let bookingRes;

            if (localStorage.getItem('booking')) {
                bookingId = JSON.parse(localStorage.getItem('booking'))._id;
                console.log('bookingId', bookingId);
                bookingRes = yield call(api.updateSelectedAppointment, {
                    id: bookingId,
                    appointment: user.firstName + ' ' + user.lastName,
                    location: data.location,
                    bookingTime: data.bookingTime,
                    bookingDate: data.bookingDate,
                    type: data.type,
                    email: user.email,
                    _user: user._id,
                })
            } else {
                bookingRes = yield call(api.appointment, {
                    appointment: user.firstName + ' ' + user.lastName,
                    location: data.location,
                    bookingTime: data.bookingTime,
                    bookingDate: data.bookingDate,
                    type: data.type,
                    email: user.email,
                    _user: user._id
                })
            }

            console.log('bookingRes', bookingRes)
            if (bookingRes.ok) {
                const success = 'you’re all set'
                localStorage.setItem('booking', JSON.stringify(bookingRes.data.data));
                yield put(Actions.bookingSuccess(bookingRes.data.data, success));
                yield put(Actions.setUserAppointment(bookingRes.data.data, success));
                yield put(push('/detail'));
            } else {
                error = path(['data', 'error_msg'], bookingRes) || error
                yield put(Actions.bookingFailure(error))
            }
        } else {
            yield put(push('/account'));
        }

	}

	function* watchSetBook() {
        const task = yield takeLatest(Types.PICK_DATE, booking)
    }

    function* getAppointments() {
        let error = 'Something went wrong.'
        const { value } = yield take(Types.GET_APPOINTMENT_REQUEST);
        const appointmentRes = yield call(api.getAppointments)
        if (appointmentRes.ok) {
            const success = 'Great Things Happening'
            return yield put(Actions.getAppointmentSuccess(appointmentRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], appointmentRes) || error
            yield put(Actions.getAppointmentFailed(error))
        }
    }

    function* updateSelectedAppointmentStatus({ data }) {
        let error = 'Something went wrong.'
        const appointmentRes = yield call(api.updateSelectedAppointment, {
            id: data.id,
            status: data.status
        })

        if (appointmentRes.ok) {
            const success = 'Great Things Happening'
            return yield put(Actions.updateAppointmentStatusSuccess(appointmentRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], appointmentRes) || error
            yield put(Actions.updateAppointmentStatusFailed(error))
        }
    }

    function* watchUserAppointment() {
        yield takeLatest(Types.UPDATE_APPOINTMENT_STATUS_REQUEST, updateSelectedAppointmentStatus);
    }

    function* getUsers() {
        let error = 'Something went wrong.'
        const usersRes = yield call(api.getUsers)

        if (usersRes.ok) {
            const success = 'Great Things Happening'
            return yield put(Actions.getUsersSuccess(usersRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], usersRes) || error
            yield put(Actions.getUsersFailed(error))
        }
    }

    function* watchUsers() {
        yield takeLatest(Types.GET_USERS_REQUEST, getUsers);
    }

    function* getUserInfo(data) {
        let error = 'Something went wrong.'
        const userInfoRes = yield call(api.getUserInfo, data.userId);
        console.log('userInfoRes', userInfoRes)
        if (userInfoRes.ok) {
            const success = 'Great Things Happening'
            return yield put(Actions.getUserInfoSuccess(userInfoRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], userInfoRes) || error
            yield put(Actions.getUserInfoFailed(error))
        }
    }

    function* watchUserInfo() {
        yield takeLatest(Types.GET_USER_INFO_REQUEST, getUserInfo);
    }

    function* updateUserInfo({ data, userId }) {
        let error = 'Something went wrong.'
        const userInfoRes = yield call(api.updateUserInfo, {
            photo: data,
            userId: userId
        });
        console.log('userInfoRes', userInfoRes)
        if (userInfoRes.ok) {
            const success = 'Great Things Happening'
            yield put(Actions.getUserInfoSuccess(userInfoRes.data.data))
            return yield put(Actions.updateUserInfoSuccess(userInfoRes.data.data, success))
            // return yield put(push('/admin/user'));
        } else {
            error = path(['data', 'error_msg'], userInfoRes) || error
            yield put(Actions.updateUserInfoFailed(error))
        }
    }

    function* watchUpdateUserInfo() {
        yield takeLatest(Types.UPDATE_USER_INFO_REQUEST, updateUserInfo);
    }

    function* getBookingDates() {
        let error = 'Something went wrong.'
        const bookingRes = yield call(api.getBookingDates)

        if (bookingRes.ok) {
            const success = 'Great Things Happening.'
            return yield put(Actions.getBookingDatesSuccess(bookingRes.data.data))

        } else {
            error = path(['data', 'error_msg'], bookingRes) || error
            yield put(Actions.getBookingDatesFailed(error))
        }
    }

    function* watchBookingDates() {
        yield takeLatest(Types.GET_BOOKING_DATES_REQUEST, getBookingDates);
    }

    function* confirmAppointment(data) {
        console.log(data);
        let error = 'Something went wrong.'
        const confirmRes = yield call(api.confirmAppointment, {token: data.token})

        if (confirmRes.ok) {
            const success = 'Great Things Happening.'
            return yield put(Actions.confirmSuccess(confirmRes.data.data, success))

        } else {
            error = path(['data', 'error_msg'], confirmRes) || error
            yield put(Actions.confirmFailed(error))
        }
    }

    function* watchConfirmAppointment() {
        yield takeLatest(Types.CONFIRM_ATTEMPT, confirmAppointment);
    }

    function* cancelAppointmentRequest(data) {
        console.log(data);
        let error = 'Something went wrong.'
        const confirmRes = yield call(api.cancelAppointment, data.id)

        if (confirmRes.ok) {
            const success = 'Great Things Happening.'
            localStorage.removeItem('booking');
            yield put(Actions.removeUserAppointment())
            yield put(Actions.cancelAppointmentSuccess(confirmRes.data.data, success))
            yield put(push('/'));

        } else {
            error = path(['data', 'error_msg'], confirmRes) || error
            yield put(Actions.cancelAppointmentFailed(error))
        }
    }

    function* watchCancelAppointmentRequest() {
        yield takeLatest(Types.CANCEL_APPOINTMENT_REQUEST, cancelAppointmentRequest);
    }

    function* sendEmail(data) {
        const state = yield select();
        const user = state.auth.user;
        const content = {
            email: data.data.email,
            content: data.data.content,
            userEmail: user.email
        }
        let error = 'Something went wrong.'
        const confirmRes = yield call(api.sendEmail, content)

        if (confirmRes.ok) {
            const success = 'Great Things Happening.'
            return yield put(Actions.sendEmailSuccess(confirmRes.data.data, success))

        } else {
            error = path(['data', 'error_msg'], confirmRes) || error
            yield put(Actions.sendEmailFailed(error))
        }
    }

    function* watchSendEmailRequest() {
        yield takeLatest(Types.SEND_EMAIL_REQUEST, sendEmail);
    }

	return {
        watchSetBook,
        getAppointments,
        watchUserAppointment,
        watchUsers,
        watchUserInfo,
        watchUpdateUserInfo,
        watchBookingDates,
        watchConfirmAppointment,
        watchCancelAppointmentRequest,
        watchSendEmailRequest
	}
}
