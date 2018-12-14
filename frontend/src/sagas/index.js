import { all } from 'redux-saga/effects'
import api from '../services/api'

// Sagas
import startup from './startup'
import runtime from './runtime'
import auth from './auth'
import user from './user'

// Start the daemons
export default function* root() {
  yield all([
		startup(api).bootingFlow(),
		runtime(api).watchersFlow(),
		auth(api).loginFlow(),
		auth(api).logoutFlow(),
		auth(api).registerFlow(),
		auth(api).watchForgotFlow(),
		auth(api).watchResetFlow(),
		auth(api).watchUserUpdateFlow(),
		auth(api).watchConfirmRegisterFlow(),
		auth(api).watchUserInfoFlow(),
		user(api).watchSetBook(),
		user(api).getAppointments(),
		user(api).watchUserAppointment(),
		user(api).watchUsers(),
		user(api).watchUpdateUserInfo(),
		user(api).watchBookingDates(),
		user(api).watchConfirmAppointment(),
		user(api).watchCancelAppointmentRequest(),
		user(api).watchSendEmailRequest(),
		user(api).watchUserDetailInfoRequest()
  ])
}
