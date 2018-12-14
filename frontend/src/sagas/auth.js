import { path, prop } from 'ramda'
// import { delay } from 'redux-saga'
import { push } from 'react-router-redux';
import { take, put, call, fork, cancel, cancelled, select, takeLatest } from 'redux-saga/effects'
import { Types, Creators as Actions } from '../actions'


export default api => {
    // AUTH
    function* auth(user) {
        try {
            let error = 'Something Went Wrong.'
            const authResp = yield call(api.auth, user)
            console.log('authResp', authResp);
            // Did user login?
            if (authResp.ok) {
                const success = 'Great Things Happening.'
                yield put(Actions.loginAuthSuccess(authResp.data, success))
                localStorage.setItem('token', authResp.data.token);
                if (authResp.data.appointment) {
                    localStorage.setItem('booking', JSON.stringify(authResp.data.appointment));
                    yield put(Actions.bookingSuccess(authResp.data.appointment, success))
                }
                const state = yield select();
                const data = state.user;
                const user = authResp.data.user;
                let error = 'Booking failed.'
                console.log('data=====>', data)
                if (data.bookingTime && data.bookingDate) {
                    const bookingRes = yield call(api.appointment, {
                        appointment: user.firstName + ' ' + user.lastName,
                        location: data.location,
                        bookingTime: data.bookingTime,
                        bookingDate: data.bookingDate,
                        type: data.type,
                        email: user.email,
                        _user: user._id
                    })
                    console.log('bookingRes', bookingRes)
                    if (bookingRes.ok) {
                        localStorage.setItem('booking', JSON.stringify(bookingRes.data.data));
                        yield put(Actions.bookingSuccess(bookingRes.data.data, success))
                        yield put(Actions.setUserAppointment(bookingRes.data.data, success));
                    } else {
                        error = path(['data', 'error_msg'], bookingRes) || error
                        yield put(Actions.bookingFailure(error))
                    }
                }
            } else {
                error = path(['data', 'error_msg'], authResp) || error
                yield put(Actions.loginFailure(error))
            }
        } catch (error) {
            yield put(Actions.loginFailure(error))
        } finally {
            if (yield cancelled()) {
                // TODO task cancelled
                console.log('Auth task cancelled.')
            }
        }
    }

    function* loginFlow() {
        while (true) {
            const { user } = yield take(Types.LOGIN_ATTEMPT)
            const task = yield fork(auth, user)
            const action = yield take([Types.LOGOUT, Types.LOGIN_FAILURE])

            // Terminate task
            if (action.type === Types.LOGOUT) yield cancel(task)
        }
    }

    // LOGOUT
    function* logoutFlow() {
        while (true) {
            yield take(Types.LOGOUT)
            api.deleteAuthHeader()
            localStorage.clear();
        }
    }

    // Register
    function* register(user) {
        try {
            let error = 'Something went wrong.'
            const registerResp = yield call(api.register, user)
            console.log('registerResp', registerResp)
            if (registerResp.ok) {
                const success = 'Great Things Happening.'
                yield put(Actions.loginAuthSuccess(registerResp.data, success))
                localStorage.setItem('token', registerResp.data.token);
                const state = yield select();
                const data = state.user;
                const user = registerResp.data.user;
                let error = 'Booking failed.'
                if (data.bookingTime && data.bookingDate) {
                    const bookingRes = yield call(api.appointment, {
                        appointment: user.firstName + ' ' + user.lastName,
                        location: data.location,
                        bookingTime: data.bookingTime,
                        bookingDate: data.bookingDate,
                        type: data.type,
                        email: user.email,
                        _user: user._id
                    })
                    console.log('bookingRes', bookingRes)
                    if (bookingRes.ok) {
                        const success = 'Great Things Happening'
                        return yield put(Actions.bookingSuccess(bookingRes.data.data, success))
                    } else {
                        error = path(['data', 'error_msg'], bookingRes) || error
                        yield put(Actions.bookingFailure(error))
                    }
                }

                // return yield put(Actions.loginUserSuccess(regData, success))

            } else {
                error = path(['data', 'data'], registerResp) || error
                yield put(Actions.registerFailure(error))
            }

        } catch (error) {
            yield put(Actions.registerFailure(error))
        } finally {
            if (yield cancelled()) {
                // TODO task cancelled
                console.log('POST Register task cancelled.')
            }
        }
    }

    function* registerFlow() {
        while (true) {
            const { user } = yield take(Types.REGISTER_ATTEMPT)
            const task = yield fork(register, user)

            const action = yield take([
                Types.LOGOUT,
                Types.REGISTER_FAILURE,
            ])

            // Terminate task
            if (action) yield cancel(task)
        }
    }

    function* forgotFlow(data) {
        console.log(data.email);
        let error = 'Something went wrong.'
        const forgotRes = yield call(api.forgotPassword, data.email);
        console.log(forgotRes)
        if (forgotRes.ok) {
            const success = 'Great Things Happening'
            yield put(Actions.forgotSuccess(forgotRes.data, success))
        } else {
            error = path(['data', 'error_msg'], forgotRes) || error
            yield put(Actions.forgotFailed(error))
        }
    }

    function* watchForgotFlow() {
        yield takeLatest(Types.FORGOT_ATTEMPT, forgotFlow);
    }

    function* resetFlow(data) {
        console.log(data);
        let error = 'Something went wrong.'
        const resetRes = yield call(api.resetPassword, data.data);
        console.log(resetRes)
        if (resetRes.ok) {
            const success = 'Great Things Happening'
            return yield put(Actions.resetSuccess(resetRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], resetRes) || error
            yield put(Actions.resetFailed(error))
        }
    }

    function* watchResetFlow() {
        yield takeLatest(Types.RESET_ATTEMPT, resetFlow);
    }

    function* userUpdate({ data, userId }) {
        let error = 'Something went wrong.'
        const userInfoRes = yield call(api.updateUserProfile, {
            data: data,
            userId: userId
        });
        console.log('updateUser', userInfoRes)
        if (userInfoRes.ok) {
            const success = 'Great Things Happening.'
            return yield put(Actions.updateUserProfileSuccess(userInfoRes.data.data, success))
        } else {
            error = path(['data', 'error_msg'], userInfoRes) || error
            yield put(Actions.updateUserProfileFailed(error))
        }
    }

    function* watchUserUpdateFlow() {
        yield takeLatest(Types.UPDATE_USER_PROFILE_REQUEST, userUpdate);
    }

    function* confirmRegister(data) {
        console.log(data);
        let error = 'Something went wrong.'
        const userInfoRes = yield call(api.confirmRegister, {
            token: data.token
        });
        console.log('userInfoRes', userInfoRes)
        if (userInfoRes.ok) {
            const success = 'Great Things Happening.'
            return yield put(Actions.confirmRegisterSuccess(userInfoRes.data, success))
        } else {
            error = path(['data', 'error_msg'], userInfoRes) || error
            yield put(Actions.confirmRegisterFailed(error))
        }
    }

    function* watchConfirmRegisterFlow() {
        yield takeLatest(Types.CONFIRM_REGISTER_ATTEMPT, confirmRegister);
    }

    return {
        loginFlow,
        logoutFlow,
        registerFlow,
        watchForgotFlow,
        watchResetFlow,
        watchUserUpdateFlow,
        watchConfirmRegisterFlow
    }
}
