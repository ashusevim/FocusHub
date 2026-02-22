import express from "express";
import { DBConnect } from "./db/db.js";
import dotenv from "dotenv";
import { isValidEmail, isValidUsername } from "./utils/inputValidation.js";
import { User } from "./schema/user.models.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

dotenv.config({
    path: "./.env",
});

DBConnect();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

/**
 * Register a new user
 * @route POST /register
 * @access Public
 */
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if (!isValidEmail(email) || !isValidUsername(username) || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    // check if user with same username or email already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        return res.status(409).json({
            message: "User with same username or email already exists",
        });
    }

    // create new user in database
    const user = await User.create({
        username,
        email,
        password,
    });

    if (!user) {
        res.status(409).json({
            message: "Something went wrong while creating user",
        });
        return;
    }

    return res.status(201).json({
        statusCode: 201,
        message: "User Registered successfully",
    });
});

/**
 * Login a new user
 * @route POST /login
 * @access Public
 */
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!isValidEmail(email) || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    // check if user with provided email exists in database
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User not found",
        });
    }

    // if the user is found, compare the provided password with the stored hashed password
    if (user.password != password) {
        return res.status(401).json({
            message: "Password is not valid",
        });
    }

    return res.status(200).json({
        message: "User logged in successfully",
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

app.get("/", (req, res) => {
    res.send("Hello, World!");
});
