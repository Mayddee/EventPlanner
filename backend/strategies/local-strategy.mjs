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
        const user = await User.findOne({username});
        if(!user){
            return done(null, false, { message: "User not found"});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return done(null, false, { message: 'Invalid password' });
        }

        return done(null, user);
    } catch(err){
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