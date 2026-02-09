import express from "express";
import DBConnect from "./db/db.ts";
const app = express();
import { User } from "./schema/user.models.js";

// Connect to the database
DBConnect().then(() => {
    app.on("error")
});

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/register", async (req, res) => {
    // get the user from the request body
    const { username, email, password } = req.body;

    // input validation
    if(!username || !email || !password){
        res.status(400).json("All fields are necessary");
    }

    // check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        res.status(409).json("The user already exists");
    }

    const user = await User.create({
        username,
        email,
        password
    })

    if(!user){
        res.status(409).json({
            message: "Something went wrong while creating user"
        });
    }

    return res.status(201).json({
        statusCode: 200,
        message: "User Registered successfully"
    })
})

app.get("/", (req, res) => {
    res.send("Hello, World!");
})