import apisauce from 'apisauce'
import { stringify } from 'qs'
import { prop, contains } from 'ramda'

// Define API
const api = apisauce.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 60000,
})

// Define API transforms
api.addRequestTransform(request => {
    const method = prop('method', request)

    if (contains(method, ['post', 'put'])) {
        request.headers['Content-Type'] = 'application/json'
        // request.data = stringify(request.data)
    }
    if (contains(method, ['get'])) {
        request.data = {}
    }
})

api.addResponseTransform(response => {
    const ok = prop('ok', response)
    const data = prop('data', response)
    const problem = prop('problem', response)

    if (!ok) {
        // console.log('Problem ::', problem, response)
        // just mutate the data to what you want.
        // TODO need to map these statuses and errors properly
        switch (problem) {
            // NOTE codes: https://github.com/infinitered/apisauce#problem-codes
            case 'CLIENT_ERROR':
                response.data = {
                    status: 'error',
                    ...data,
                }
                break
            case 'TIMEOUT_ERROR':
                response.status = 408
                response.data = {
                    status: 'error',
                    message: 'Network timeout. Please try again.',
                    ...data,
                }
                break
            case 'CONNECTION_ERROR':
                response.status = 503
                response.data = {
                    status: 'error',
                    message: 'Server not available.',
                    ...data,
                }
                break
            case 'NETWORK_ERROR':
                response.status = 511
                response.data = {
                    status: 'error',
                    message: 'Network unavailable.',
                    ...data,
                }
                break
            case 'CANCEL_ERROR':
                response.status = 500
                response.data = {
                    status: 'error',
                    message: 'Request has been cancelled.',
                    ...data,
                }
                break
            default:
                response.status = 500
                response.data = {
                    status: 'error',
                    message: 'System error. Please contact webmaster.',
                    ...data,
                }
        }
    }
})

// Endpoints
const ENDPOINT = {
    OAUTH: '/users/login',
    REGISTER: '/user',
    LOGOUT: '/logout',
    USER: '/user/:userId',
    APPOINTMENT: '/appointment',
    USERSLIST: '/user',
    BOOKINGDATE: '/bookingdate',
    FORGOTPASSWORD: '/user/forgot-password',
    RESETPASSWORD: '/user/reset-password',
    CONFIRMAPPOINTMENT: '/appointment/confirmed',
}

// TODO how to cancel/abort http request ?
export default {
    // Headers
    setAuthHeader: token => api.setHeader('Authorization', 'Basic ' + window.btoa(token + ':unused')),
    deleteAuthHeader: () => api.deleteHeader('Authorization'),
    // Auth
    auth: user => api.post(`${ENDPOINT.OAUTH}`, user),
    register: user => api.post(`${ENDPOINT.REGISTER}`, user),
    logout: () => api.get(ENDPOINT.LOGOUT),
    getUser: () => api.get(`${ENDPOINT.USER}`, {}),
    appointment: data => api.post(`${ENDPOINT.APPOINTMENT}`, data),
    getAppointments: () => api.get(ENDPOINT.APPOINTMENT),
    getBookingDates: () => api.get(ENDPOINT.BOOKINGDATE),
    updateSelectedAppointment: data => api.put(`${ENDPOINT.APPOINTMENT}`, data),
    getUsers: () => api.get(ENDPOINT.USERSLIST),
    getUserInfo: userId => api.get(`user/${userId}`),
    updateUserInfo: data => api.put(`user/${data.userId}`, data.photo),
    forgotPassword: email => api.post(`${ENDPOINT.FORGOTPASSWORD}`, email),
    resetPassword: data => api.post(`${ENDPOINT.RESETPASSWORD}`, data),
    confirmAppointment: token => api.post(`${ENDPOINT.CONFIRMAPPOINTMENT}`, token),
    updateUserProfile: data => api.put(`user/profile/${data.userId}`, data.data),
    cancelAppointment: id => api.put(`appointment/cancel/${id}`),
    sendEmail: data => api.post('user/send-message', data),
    confirmRegister: data => api.put(`user/confirm/${data.userId}`, {token: data.token}),
}
