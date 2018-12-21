const moment = require('moment');
const bcrypt = require('bcrypt-nodejs');
const _ = require('lodash');
const sgMail = require('@sendgrid/mail');

const User = require('../models/user');
const Appointment = require('../models/appointment');
const fileUpload = require('../services/fileUpload');
const config = require('../config/config');
sgMail.setApiKey(config.mail.key);

module.exports = {
    create(req, res) {
        User.findOne({ email: req.body.email }, function (error, user) {
            if (user) {
                return res.status(400).send({ error: 'this email already exists' });
            } else {
                const user = new User(req.body);
                user.password = user.generateHash(req.body.password);
                const token = user.generateJwt();
                user.token = token;
                user.save(function (err, result) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        const msg = {
                            to: req.body.email,
                            from: 'noreply@wgv.com',
                            subject: 'Confirm Email',
                            text: 'Confirm Email',
                            html: `<a href="http://localhost:4200/confirm-register/${token}">Please click here to confirm email</a>`,
                        };
                        sgMail.send(msg)
                        res.status(200).send({
                            user: result,
                            appointment: null,
                            token: token
                        });
                    }
                })
            }
        });
    },

    list(req, res) {
        User.find({isAdmin: false}, function (err, users) {

            if (err) {
                return res.status(500).send({ error: err });
            }
            res.status(200).send({ data: users });
        });
    },

    update(req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            if (user) {
                if (req.file) {
                    fileUpload.uploadPhoto(req, function (perr, pres) {
                        if (perr) {
                            return res.status(500).send({ error: perr });
                        }
                        user.glassUrl = pres;
                        user = _.merge(user, req.body);
                        user.save(function (error) {
                            if (error) {
                                return res.status(500).send({ error: error });
                            } else {
                                res.status(200).send({ data: user });
                            }
                        })
                    })

                } else {
                    user = _.merge(user, req.body);
                    user.save(function (error) {
                        if (error) {
                            return res.status(500).send({ error: error });
                        } else {
                            res.status(200).send({ data: user });
                        }
                    })
                }


            } else {
                res.status(404).send({ error: 'Not found' });
            }

        });
    },

    remove(req, res) {
        User.findByIdAndRemove(req.params.userId, function (err, data) {
            if (err) {
                return res.status(500).send({ error: err });
            } else {
                if (data) {
                    res.status(200).send({
                        success: true,
                        message: 'delete success'
                    })
                } else {
                    res.status(404).send({ error: 'Not found' });
                }
            }
        });
    },

    getOne(req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            if (user) {
                res.status(200).send({ data: user });
            } else {
                res.status(404).send({ error: 'Not found' });
            }

        });
    },

    forgotPassword(req, res) {
        console.log(req.body.email);
        const msg = {
            to: req.body.email,
            from: 'noreply@wgv.com',
            subject: 'Reset Password',
            text: 'Reset Password',
            html: `<a href="http://localhost:4200/reset">Please click here to reset password</a>`,
        };
        sgMail.send(msg)
        res.status(200).send({ success: true });
    },

    resetPassword(req, res) {
        User.findOne({ email: req.body.email }, function (error, user) {
            if (user) {
                user = _.merge(user, req.body);
                user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
                user.save(function (err, result) {
                    if (err) {
                        res.status(500).send({ error: err });
                    } else {
                        res.status(200).send({ data: result, token: result.generateJwt() });
                    }
                })
            } else {
                return res.status(404).send({ error: 'Not found' });
            }
        });
    },

    updateProfile(req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            if (user) {
                if (req.file) {
                    fileUpload.uploadPhoto(req, function (perr, pres) {
                        if (perr) {
                            return res.status(500).send({ error: perr });
                        }

                        user = _.merge(user, req.body);
                        user.pictureUrl = pres;
                        user.save(function (error) {
                            if (error) {
                                return res.status(500).send({ error: error });
                            } else {
                                res.status(200).send({ data: user });
                            }
                        })
                    })

                } else {
                    console.log(req.body)
                    user = _.merge(user, req.body);
                }

                if (req.body.password) {
                    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
                }
                user.save(function (error) {
                    if (error) {
                        return res.status(500).send({ error: error });
                    } else {
                        res.status(200).send({ data: user });
                    }
                })
            }
        })
    },

    sendMessage(req, res) {
        const msg = {
            to: req.body.email,
            from: req.body.userMail,
            subject: 'Proposal',
            text: req.body.content,
            html: `<strong>${req.body.content}</strong>`,
        };
        sgMail.send(msg)
        res.status(200).send({ success: true });
    },

    confirm(req, res) {
        User.findOne({ token: req.params.token}, function (err, user) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            console.log(user)
            if (user) {
                user.isConfirm = true;
                const token = user.generateJwt();
                user.save(function (err, result) {
                    if (err) {
                        return res.status(500).send({ error: err });
                    }
                    Appointment.findOne({
                        $and: [
                            {_user: result._id},
                            {status: {$eq: 'pending'}}
                        ]} , function (err, appointment) {
                        if (err) {
                            return res.status(200).send({
                                user: result,
                                appointment: null,
                                token: token
                            })
                        }
                        if (appointment) {
                            res.status(200).send({
                                user: result,
                                appointment: appointment,
                                token: token
                            })
                        } else {
                            res.status(200).send({
                                user: result,
                                appointment: null,
                                token: token
                            })
                        }

                    });
                })
            } else {
                res.status(404).send({ error: 'Not found' });
            }

        });
    }
}