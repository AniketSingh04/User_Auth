const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const connectDB = require("./db/dbConnection"); // Adjust path as per your project structure
const User = require("./db/user"); // Adjust path as per your project structure

const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Route for user registration
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate that username and password are provided
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Generate a hashed version of the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the provided username and hashed password
        const newUser = new User({ username, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: "Registration Successful" });
    } catch (error) {
        // Handle any errors that occur during registration
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Registration Failed" });
    }
});

// Route for user login
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate that username and password are provided
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Find the user with the provided username in the database
        const user = await User.findOne({ username });
        if (!user) {
            // Respond with an error if the user is not found
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Respond with an error if the password is invalid
            return res.status(401).json({ error: "Invalid password" });
        }

        // Respond with a success message if login is successful
        res.status(200).json({ message: "Login Successful" });
    } catch (error) {
        // Handle any errors that occur during login
        console.error("Error during login:", error);
        res.status(500).json({ error: "Login Failed" });
    }
});

// Connect to the database
connectDB()
    .then(() => {
        console.log("Database connection successful");
        // Start the server and listen on the defined port
        app.listen(port, () => {
            console.log(`Server is listening on PORT ${port}...`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });

