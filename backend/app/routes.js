const multer = require('multer');
const upload = multer();

const User = require('./controllers/user');
const AppointmentModel = require('./models/appointment');
const Appointment = require('./controllers/appointment');
const isLoggedIn = require('./middlewares/requireLogin');

module.exports = function(app, passport) {

    app.post('/api/users/login',
        passport.authenticate('local-login'), function(req, res) {
            if(req.user) {
                AppointmentModel.findOne({_user: req.user._id } , function (err, appointment) {
                    if (err) {
                        res.status(200).send({
                            user: req.user,
                            appointment: null,
                            token: req.user.generateJwt()
                        })
                    }
                    if (appointment) {
                        res.status(200).send({
                            user: req.user,
                            appointment: appointment,
                            token: req.user.generateJwt()
                        })
                    } else {
                        res.status(200).send({
                            user: req.user,
                            appointment: null,
                            token: req.user.generateJwt()
                        })
                    }

                });


            } else {
                res.status(401).send({ error: 'login failed' })
            }
        }
    );

    app.get('/api/user/logout', function(req, res) {
        req.logout();
        res.status(200).send({ data: 'logout success' });
    });

    app.post('/api/user/forgot-password', User.forgotPassword);
    app.post('/api/user/reset-password', User.resetPassword);

    app.post('/api/user', User.create);
    app.get('/api/user', User.list);
    app.get('/api/user/:userId', User.getOne);
    app.delete('/api/user/:userId', User.remove);
    app.put('/api/user/:userId', upload.single('photo'), User.update);
    app.put('/api/user/profile/:userId', upload.single('photo'), User.updateProfile);
    app.post('/api/user/send-message', User.sendMessage);
    app.put('/api/user/confirm/:userId', User.confirm);

    app.post('/api/appointment', Appointment.create);
    app.put('/api/appointment', Appointment.update);
    app.get('/api/appointment', Appointment.list);
    app.put('/api/appointment/cancel/:appointmentId', Appointment.cancel);
    app.get('/api/bookingdate', Appointment.getBookingDates);
    app.post('/api/appointment/confirmed', Appointment.confirm);

};
