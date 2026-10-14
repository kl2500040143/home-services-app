const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: true
        },

        customerName: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        bookingDate: {
            type: String,
            required: true
        },

        bookingTime: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);