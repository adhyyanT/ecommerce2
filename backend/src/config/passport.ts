import local from 'passport-local';
import { User } from '../Models/User';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();

const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
const LocalStrategy = local.Strategy;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.secret!,
    },
    function (jwtPayload, cb) {
      if (jwtPayload === undefined || jwtPayload === null)
        return cb(createHttpError(401, 'Not Authorized'));
      return cb(null, jwtPayload.user);
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async function (email: string, password: string, done: any) {
      try {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });
        if (!user)
          return done(createHttpError(400, 'Invalid Credentials'), false);
        // console.log(user);
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch);
        if (!isMatch)
          return done(createHttpError(400, 'Invalid Credentials'), false);
        // console.log(user);
        return done(null, user);
      } catch (error) {
        console.log(error);
        done(createHttpError(500, 'Server Error'), false);
      }
    }
  )
);

export default passport;
