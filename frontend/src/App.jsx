import { useState } from "react";
import "./App.css";
import Booking from "./Booking";
import Login from "./Login";
import MyBookings from "./MyBookings";
function App() {
    const [selectedService, setSelectedService] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showMyBookings, setShowMyBookings] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
);
    const services = [
        {
            name: "Home Cleaning",
            description: "Professional cleaning for your home",
            price: "From ₹499"
        },
        {
            name: "Plumbing",
            description: "Quick and reliable plumbing services",
            price: "From ₹299"
        },
        {
            name: "Electrical",
            description: "Safe electrical repair and installation",
            price: "From ₹399"
        },
        {
            name: "AC Repair",
            description: "AC servicing and repair at your doorstep",
            price: "From ₹499"
        }
    ];
  if (selectedService) {
        return (
            <Booking
                service={selectedService}
                onBack={() => setSelectedService(null)}
            />
        );
    }
  if (showLogin) {
    return (
        <Login
            onLogin={(user) => {
                setLoggedInUser(user);
                setShowLogin(false);
            }}
            onBack={() => setShowLogin(false)}
        />
    );
}

if (showMyBookings) {
    return (
        <MyBookings
            onBack={() => setShowMyBookings(false)}
        />
    );
}

    return (
        <div className="app">

            <header className="navbar">
                <div className="logo">HomeServe</div>

                <nav>
                    <a href="#home">Home</a>
                    <a href="#services">Services</a>
                    <a href="#about">About</a>
                    <button onClick={() => setShowMyBookings(true)}>
                       My Bookings
                    </button>
                    <button
    className="login-btn"
    onClick={() => setShowLogin(true)}
>
    {loggedInUser ? loggedInUser.name : "Login"}
</button>
                </nav>
            </header>

            <section className="hero" id="home">
                <div className="hero-content">
                    <h1>Home Services at Your Doorstep</h1>

                    <p>
                        Book trusted professionals for cleaning,
                        plumbing, electrical work, AC repair and more.
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() =>
                            document
                                .getElementById("services")
                                .scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Book a Service
                    </button>
                </div>
            </section>

            <section className="services" id="services">
                <h2>Our Services</h2>

                <p className="section-text">
                    Choose a service and get a professional at your doorstep.
                </p>

                <div className="service-container">

                    {services.map((service, index) => (
                        <div className="service-card" key={index}>

                            <div className="service-icon">
                                🛠️
                            </div>

                            <h3>{service.name}</h3>

                            <p>{service.description}</p>

                            <strong>{service.price}</strong>

                            <button
                                className="book-btn"
                                onClick={() =>
                                    setSelectedService(service.name)
                                }
                            >
                                Book Now
                            </button>

                        </div>
                    ))}

                </div>
            </section>

            {selectedService && (
                <section className="booking-section">

                    <h2>Book Your Service</h2>

                    <p>
                        Selected Service:{" "}
                        <strong>{selectedService}</strong>
                    </p>

                    <form className="booking-form">

                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            required
                        />

                        <textarea
                            placeholder="Your Address"
                            required
                        ></textarea>

                        <input
                            type="date"
                            required
                        />

                        <input
                            type="time"
                            required
                        />

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            Confirm Booking
                        </button>

                    </form>

                </section>
            )}

            <section className="about" id="about">
                <h2>Why Choose HomeServe?</h2>

                <div className="features">

                    <div>
                        <h3>✓ Trusted Professionals</h3>
                        <p>Verified service providers.</p>
                    </div>

                    <div>
                        <h3>✓ Easy Booking</h3>
                        <p>Book services in just a few clicks.</p>
                    </div>

                    <div>
                        <h3>✓ Reliable Service</h3>
                        <p>Quality service at your doorstep.</p>
                    </div>

                </div>
            </section>

            <footer>
                <p>© 2026 HomeServe. All rights reserved.</p>
            </footer>

        </div>
    );
}

export default App;