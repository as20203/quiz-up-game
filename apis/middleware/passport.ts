import { PassportStatic, authenticate } from 'passport';
import { Request, Response, NextFunction } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { User } from '~/models';
import { FailureMessages, PassportMiddleware } from '~/types';
import { comparePasswordHash, failure } from '~/utils';
const environment = process.env;

const cookieExtractor = (request: Request): string => {
  let token = null;
  if (request && request.cookies) token = request.cookies['AUTH-COOKIE'];
  return token;
};

export const authenticateUser = (passport: PassportStatic) => {
  const opts: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: environment.JWT_SECRET
  };
  passport.use(
    'jwt',
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.getUser(jwtPayload.user._id);
        if (!user.isExecuted) {
          //If the user isn't found in the database, return a message
          return done('Authentication failed.', false, { message: 'User not found.' });
        }
        //Send the user information to the next middleware
        return done(null, { ...user.data }, { message: 'Logged in successfully.' });
      } catch (error) {
        return done(error);
      }
    })
  );

  const resetPasswordOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromBodyField('token'),
    secretOrKey: environment.JWT_SECRET
  };
  passport.use(
    'updatePassword',
    new JwtStrategy(resetPasswordOptions, async function(jwtPayload, done) {
      try {
        const user = await User.findOne({ _id: jwtPayload.user._id })
          .select('password')
          .exec();
        //var user = await employee.findOne({_id: jwt_payload.user._id}).exec();
        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: 'User not found.' });
        }
        //Send the user information to the next middleware
        return done(null, { ...user.toObject() }, { message: 'Logged in successfully.' });
      } catch (error) {
        return done(error);
      }
    })
  );

  const changePasswordOptions: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: environment.JWT_SECRET
  };
  passport.use(
    'changePassword',
    new JwtStrategy(changePasswordOptions, async function(jwtPayload, done) {
      try {
        const user = await User.findOne({ _id: jwtPayload.user._id })
          .select('password')
          .exec();
        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, { message: 'User not found.' });
        }
        //Send the user information to the next middleware
        return done(null, user.toObject(), { message: 'Logged in successfully.' });
      } catch (error) {
        return done(error);
      }
    })
  );
  //Create a passport middleware to handle User login
  passport.use(
    'local.one',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const validationErrors: FailureMessages[] = [];
          //Find the user associated with the email provided by the user
          const foundUser = await User.findOne({
            email
          })
            .select('-__v')
            .exec();
          if (!foundUser) {
            validationErrors.push({
              fieldName: 'email',
              errorMessage: 'Email address is incorrect.'
            });
            return done(validationErrors, false);
            //If the user isn't found in the database, return a message
          }
          //Validate password and make sure it matches with the corresponding hash stored in the database
          //If the passwords match, it returns a value of true.

          const { password: hashedPassword } = foundUser.toObject();
          const validate = await comparePasswordHash(password, hashedPassword);
          if (!validate) {
            validationErrors.push({
              fieldName: 'password',
              errorMessage: 'Password is incorrect.'
            });
            return done(validationErrors, false);
          }
          //Send the user information to the next middleware

          return done(
            null,
            { ...foundUser.toObject(), category: 'employee' },
            { message: 'Logged in successfully.' }
          );
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    'forgotPassword',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'email'
      },
      async (email, _, done) => {
        try {
          const validationErrors: FailureMessages[] = [];
          //Find the user associated with the email provided by the user
          const user = await User.findOne({
            email
          }).exec();
          if (!user) {
            validationErrors.push({
              fieldName: 'email',
              errorMessage: 'Email address is incorrect.'
            });
            //If the user isn't found in the database, return a message
            return done(validationErrors, false);
          }
          //Send the user information to the next middleware
          return done(
            null,
            { ...user.toObject(), category: 'employee' },
            { message: 'Found Successfully.' }
          );
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export const authenticationHandler = (middleware: PassportMiddleware) => {
  return (request: Request, response: Response, next: NextFunction) => {
    authenticate(middleware, { session: false }, (error, user, info) => {
      if (error) {
        failure(response, error, `Authentication Failed.`, 401);
      } else if (!user) {
        failure(response, info.message, `Authentication Failed.`, 401);
      } else {
        request.user = user;
        next();
      }
    })(request, response, next);
  };
};

export const checkIfAdmin = (request: Request, response: Response, next: NextFunction) => {
  const {
    user: { role }
  } = request;
  if (role !== 'admin') return failure(response, `User is not admin`, 'Authentication Failed', 401);
  return next();
};
