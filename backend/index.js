import express from "express";
// import router from "./routes/index";
import {  loggingMiddleware } from "./utils/middlewares.mjs";
import cookieParser from "cookie-parser"
import session from "express-session"
import { query, validationResult, body, matchedData, checkSchema, check } from "express-validator";
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";
// import { mockUsers } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from './models/User.js';

const app = express(); //reference

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser("madina you are"));
// app.use(bodyParser.json());
app.use(session({
    secret: 'madina you are',
    saveUninitialized: false, //to not store if session object has nothing to save memory
    resave: false, //forcing not to save session to session store if not modified
    cookie: { //to configure how long cookie will live
        maxAge: 60000 * 60, // to set user be logged in for 1 hour
    }
})) // before regestering any endpoints as routes


// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/auth-db')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));


app.use(passport.initialize()); // after sessions use, before routes
app.use(passport.session());
// app.use(router);

const PORT = process.env.PORT || 3010; //referencing a global object process


app.listen(PORT, () => { //post-processing operation after server starts up
    console.log(`Running on Port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    }
}); //for listening to a port for incoming request



app.use(loggingMiddleware, (request, response, next) => {
    console.log("Finished Loading...")
    next()
}) //it must be before endpoints since order matters




app.get("/", (request, response, next) => {
    console.log("Base URL 1")
    next()
}, 
(request, response, next) => {
    console.log("Base URL 2")
    next()
}, 
(request, response) => {
    // response.send({msg: "Hello!"})
    console.log(request.session)
    console.log(request.session.id)
    request.session.visited =true
    // response.cookie("hello", "world", { maxAge: 15000 * 2, signed: true })
    response.status(201).send({msg: "Hello!"})
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// Регистрация
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ error: "Username already taken" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Логин
app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in successfully', user: req.user });
});

// app.post('/api/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err) {
//             return next(err);  // Pass errors to the error handler
//         }
//         if (!user) {
//             return res.status(401).json({ message: 'Authentication failed' });
//         }
//         req.logIn(user, (err) => {
//             if (err) {
//                 return next(err);  // Pass errors to the error handler
//             }
//             res.json({ message: 'Logged in successfully', user: req.user });
//         });
//     })(req, res, next);  // Don't forget to call the function with (req, res, next)
// });

// Проверка аутентификации
const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Защищённый маршрут
app.get('/api/secret', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.get("/api/logout", (req, res) => {
    req.logout((err) =>{
        if(err) return res.status(500).send({
            error: "Logout failed."
        });
        res.status(200).send({message: "Logout successfully!"});
    });
} );

// Endpoint to check if the user is active (authenticated)
app.get('/api/active-user', (req, res) => {
    if (req.isAuthenticated()) {
        // If the user is authenticated, return the user information
        res.status(200).json({ message: 'User is active', user: req.user });
    } else {
        // If the user is not authenticated, return an error
        res.status(401).json({ message: 'User is not authenticated' });
    }
});



