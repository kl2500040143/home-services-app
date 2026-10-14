
import { useEffect, useState } from "react";

function MyBookings({onBack}) {
    const [bookings, setBookings] = useState([]);
    const [phone, setPhone] = useState("");
    const [searched, setSearched] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const loadBookings = async () => {
        if (!phone.trim()) {
            setMessage("Please enter your phone number.");
            return;
        }

        setLoading(true);
        setMessage("");
        setSearched(true);

        try {
            const response = await fetch(
                `http://localhost:5000/api/bookings?phone=${encodeURIComponent(phone.trim())}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not load bookings.");
            }

            setBookings(data);

            if (data.length === 0) {
                setMessage("No bookings found for this phone number.");
            }
        } catch (error) {
            setMessage("Could not connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };
const cancelBooking = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
        const response = await fetch(
            `http://localhost:5000/api/bookings/${id}/cancel`,
            {
                method: "PATCH"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Cancellation failed");
            return;
        }

        alert("Booking cancelled successfully!");
        await loadBookings();
    } catch (error) {
        alert("Could not connect to the backend.");
        console.error(error);
    }
};

    return (
        <div className="my-bookings-page">
            <h1>My Bookings</h1>
            <button type="button" onClick={onBack}>
               ← Back to Home
            </button>
            <p>Check your home service booking history and status.</p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    loadBookings();
                }}
            >
                <input
                    type="tel"
                    placeholder="Enter your booking phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Find My Bookings"}
                </button>
            </form>

            {message && <p>{message}</p>}

            <div className="booking-list">
                {bookings.map((booking) => (
                    <div className="booking-card" key={booking._id}>
                        <h2>{booking.serviceName}</h2>
                        <p><strong>Name:</strong> {booking.customerName}</p>
                        <p><strong>Date:</strong> {booking.bookingDate}</p>
                        <p><strong>Time:</strong> {booking.bookingTime}</p>
                        <p><strong>Address:</strong> {booking.address}</p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {booking.status || "pending"}
                        </p>
                        <button
                            type="button"
                            onClick={() => cancelBooking(booking._id)}
                        >
                            Cancel Booking
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyBookings;
