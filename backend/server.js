
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Booking = require("./models/booking");
const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Services API is running");
});

// Register
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Please fill in all fields"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Create booking
app.post("/api/bookings", async (req, res) => {
    try {
        const {
            serviceName,
            customerName,
            phone,
            address,
            bookingDate,
            bookingTime
        } = req.body;

        if (
            !serviceName ||
            !customerName ||
            !phone ||
            !address ||
            !bookingDate ||
            !bookingTime
        ) {
            return res.status(400).json({
                message: "Please fill in all booking fields"
            });
        }

        const booking = await Booking.create({
            serviceName,
            customerName,
            phone,
            address,
            bookingDate,
            bookingTime,
            status: "pending"
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// View bookings by phone number
app.get("/api/bookings", async (req, res) => {
    try {
        const { phone } = req.query;

        if (!phone) {
            return res.status(400).json({
                message: "Phone number is required"
            });
        }

        const bookings = await Booking.find({ phone }).sort({
            createdAt: -1
        });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Cancel a pending booking
app.patch("/api/bookings/:id/cancel", async (req, res) => {
    console.log("CANCEL ROUTE CALLED:", req.params.id);
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if (booking.status !== "pending") {
            return res.status(400).json({
                message: "Only pending bookings can be cancelled"
            });
        }

        booking.status = "cancelled";
        await booking.save();

        res.json({
            message: "Booking cancelled successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
