import express from "express";
import DBConnect from "./db/db.js";
import dotenv from "dotenv"
import { isValidEmail, isValidPassword, isValidUsername } from "./utils/inputValidation.js";

dotenv.config({
    path: "./.env"
})

const app = express();
import { User } from "./schema/user.models.js";

// Connect to the database
DBConnect()
    .then(() => {
        const port = process.env.PORT || 8000;
        const server = app.listen(port, () => {
            console.log(`Server is running on port: ${port}`)
        })

        server.on("error", (error) => {
            console.log('Server error: ', error);
            process.exit(1);
        })
    })
    .catch((error) => {
        console.log("MongoDB connection failed: ", error)
    })

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * Register a new user
 * @route POST /register
 * @access Public
 */
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input fields
    if(!isValidEmail(email) || !isValidUsername(username) || !isValidPassword(password)){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // check if user with same username or email already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        return res.status(409).json({
            message: "User with same username or email already exists"
        })
    }

    // create new user in database
    const user = await User.create({
        username,
        email,
        password
    })

    if(!user){
        res.status(409).json({
            message: "Something went wrong while creating user"
        });
        return;
    }

    return res.status(201).json({
        statusCode: 201,
        message: "User Registered successfully"
    })
})

/**
 * Login a new user
 * @route POST /login
 * @access Public
 */
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if(!isValidEmail(email) || !isValidPassword(password)){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const user = await User.findOne({
        $or: [{ email }, { password }]
    })

    if(!user){
        return res.status(400).json({
            message: "User not found"
        })
    }

    // if the user is found, compare the provided password with the stored hashed password
    if(user.password != password){
        return res.status(401).json({
            message: "Password is not valid"
        })
    }

    return res.status(200).json({
        message: "User logged in successfully"
    })
})

app.get("/", (req, res) => {
    res.send("Hello, World!");
})
