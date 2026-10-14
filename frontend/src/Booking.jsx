import { useState } from "react";
import "./Booking.css";

function Booking({ service, onBack }) {

    const [formData, setFormData] = useState({
        customerName: "",
        phone: "",
        address: "",
        bookingDate: "",
        bookingTime: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serviceName: service,
                    ...formData
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Booking confirmed successfully!");

                setFormData({
                    customerName: "",
                    phone: "",
                    address: "",
                    bookingDate: "",
                    bookingTime: ""
                });
            } else {
                setMessage(data.message || "Booking failed");
            }

        } catch (error) {
            setMessage("Server connection failed");
        }
    };

    return (
        <div className="booking-page">

            <div className="booking-box">

                <button
                    className="back-btn"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <h1>Book Your Service</h1>

                <p className="selected-service">
                    Selected Service: <strong>{service}</strong>
                </p>

                <form
                    className="booking-form"
                    onSubmit={handleSubmit}
                >

                    <label>Full Name</label>

                    <input
                        type="text"
                        name="customerName"
                        placeholder="Enter your name"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone Number</label>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label>Address</label>

                    <textarea
                        name="address"
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <label>Booking Date</label>

                    <input
                        type="date"
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleChange}
                        required
                    />

                    <label>Booking Time</label>

                    <input
                        type="time"
                        name="bookingTime"
                        value={formData.bookingTime}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="confirm-btn"
                    >
                        Confirm Booking
                    </button>

                    {message && (
                        <p className="booking-message">
                            {message}
                        </p>
                    )}

                </form>

            </div>

        </div>
    );
}

export default Booking;