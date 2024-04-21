import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../modules/user.js"; // Assurez-vous d'importer le modèle User depuis votre système de gestion de base de données

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

export default passport;
