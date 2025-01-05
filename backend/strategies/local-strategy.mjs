// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;

// passport.use(new LocalStrategy((username, password, done) => {
    
// }));

import passport from "passport";

import User from '../models/User.js';  // Adjust the import path if needed
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from "passport-local";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
        console.log("Authenticating user:", username); 
        const user = await User.findOne({username});
        if(!user){
            console.log("User not found:", username);
            return done(null, false, { message: 'Invalid username'});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            console.log("Password mismatch for user:", username); // Log password failure
            return done(null, false, { message: 'Invalid password' });        
        }
        console.log("Authentication successful for user:", username); // Log success

        return done(null, user);
    } catch(err){
        console.error("Error in authentication:", err); // Log any errors

        return done(err);
    }
  }
));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err){
        done(err);
    }
});