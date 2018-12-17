const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = mongoose.Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
		type: String,
        enum: ['confirmed', 'pending', 'cancel'],
        default: 'pending',
		required: true,
        index: true,
    },
    appointment: String,
    type: String,
    addressOne: String,
    addressTwo: String,
    bookingTime: String,
    bookingDate: String,
    confirmed: { type: Boolean, default: false },
    confirmToken: String
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
