const _ = require('lodash');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');

const Appointment = require('../models/appointment');
const config = require('../config/config');
sgMail.setApiKey(config.mail.key);

module.exports = {
    create(req, res) {
        const mail = req.body.email;

        Appointment.findOne({
            $and: [
                {_user: req.body._user},
                {status: {$ne: 'cancel'}}
            ]}, function(error, appointment) {
            if (appointment) {
                const msg = {
                    to: mail,
                    from: 'noreply@wgv.com',
                    subject: 'Appointment',
                    text: 'Booking Appointment',
                    html: ` <strong>You have already one appointment</strong></br>
                            <strong>Place: </strong><p>${appointment.location}</p></br>
                            <strong>Time: </strong><p>${appointment.bookingDate} ${appointment.bookingTime}</p></br>
                            <strong>Type: </strong><p>${appointment.type}</p>`,
                };
                sgMail.send(msg)
                res.status(200).send({ data: appointment });
            } else {
                const appointment = new Appointment(req.body);
                const expiry = new Date();
                expiry.setDate(expiry.getDate() + 7);
                const token = jwt.sign({
                    email: mail,
                    exp: parseInt(expiry.getTime() / 1000),
                }, "MY_SECRET");

                appointment.confirmToken = token;
                appointment.save(function (err, result) {
                    if (err) {
                        return res.status(500).send({ error: err });
                    } else {
                        const msg = {
                            to: mail,
                            from: 'noreply@wgv.com',
                            subject: 'New Appointment',
                            text: 'Booking Appointment',
                            html: ` <strong>Place: </strong><p>${appointment.location}</p> </br>
                                    <strong>Time: </strong><p>${appointment.bookingDate} ${appointment.bookingTime}</p></br>
                                    <strong>Type: </strong><p>${appointment.type}</p>`,
                        };
                        sgMail.send(msg)
                        res.status(200).send({ data: result });
                    }
                })
            }
        })
    },

    update(req, res) {
        Appointment.findById(req.body.id, function (err, appointment) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            if (appointment) {
                appointment = _.merge(appointment, req.body);
                appointment.save(function (err, result) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        res.status(200).send({ data: result });
                    }
                })

            } else {
                res.status(404).send({ error: 'Not found' });
            }

        });
    },

    async getBookingDates(req, res) {
        const appointments = await Appointment.aggregate([
            {
                '$sort': {"bookingDate": 1 }
            }
        ])

        let data = {};
        appointments.map(appointment => {
            if (data.hasOwnProperty(appointment.bookingDate)) {
                data[appointment.bookingDate].push(appointment.bookingTime);
            } else {
                data[appointment.bookingDate] = [appointment.bookingTime];
            }
        })
        res.status(200).send({ data });

    },

    list(req, res) {
        Appointment.find({ status: {$ne: 'cancel'} }, function (err, appointments) {
            if(err)
                return res.status(500).send({ error: err });

            res.status(200).send({ data: appointments });
        });
    },

    confirm(req, res) {
        Appointment.findOne({confirmToken: req.body.token } , function (err, appointment) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            if (appointment) {
                appointment.status = 'confirmed';
                appointment.confirmed = true;
                appointment.save(function (err, result) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        res.status(200).send({ data: result });
                    }
                })

            } else {
                res.status(404).send({ error: 'Not found' });
            }

        });
    },

    cancel(req, res) {
        Appointment.findById(req.params.appointmentId, function(err, appointment) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            if (appointment) {
                appointment.status = 'cancel';
                appointment.bookingDate = null;
                appointment.bookingTime = null;
                appointment.save(function (err, result) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        res.status(200).send({ data: result });
                    }
                })
            } else {
                res.status(404).send({ error: 'Not found' });
            }
        })
    }
}