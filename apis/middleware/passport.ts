import { PassportStatic, authenticate } from 'passport';
import { Request, Response, NextFunction } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { Category, User } from '~/models';
import { FailureMessages, PassportMiddleware } from '~/types';
import { comparePasswordHash, failure } from '~/utils';
const environment = process.env;

export const authenticateUser = (passport: PassportStatic) => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

  //Create a passport middleware to handle User login
  passport.use(
    'local.one',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      async (username, password, done) => {
        try {
          const validationErrors: FailureMessages[] = [];
          //Find the user associated with the email provided by the user
          const foundUser = await User.findOne({
            username
          })
            .select('-__v')
            .exec();
          if (!foundUser) {
            validationErrors.push({
              fieldName: 'username',
              errorMessage: 'username is incorrect.'
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

          return done(null, { ...foundUser.toObject() }, { message: 'Logged in successfully.' });
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
    user: { category }
  } = request;
  if (category !== 'admin')
    return failure(response, `User is not admin`, 'Authentication Failed', 401);
  return next();
};

export const questionAccess = async (request: Request, response: Response, next: NextFunction) => {
  const {
    params: { id },
    user: { category, _id: userId }
  } = request;
  if (category === 'player')
    return failure(response, `User is not authorized`, 'Authentication Failed', 401);
  else if (category === 'contributor') {
    if (id) {
      const retrievedCategory = await Category.getCategory(id);
      if (!retrievedCategory.isExecuted) {
        return failure(response, `User is not authorized`, 'Authentication Failed', 401);
      }
      const { addedBy } = retrievedCategory.data;
      if (addedBy !== userId.toString())
        return failure(response, `User is not authorized`, 'Authentication Failed', 401);
    }
  }
  return next();
};

export const checkCategory = (request: Request, response: Response, next: NextFunction) => {
  const {
    body: { category: userCategory }
  } = request;
  if (userCategory !== 'admin') return next();
  else if (userCategory === 'admin') {
    return authenticate('jwt', { session: false }, (error, user, info) => {
      if (error) {
        failure(response, error, `Authentication Failed.`, 401);
      } else if (!user) {
        failure(response, info.message, `Authentication Failed.`, 401);
      } else if (user && user.category !== 'admin') {
        failure(response, info.message, `Authentication Failed.`, 401);
      } else {
        request.user = user;
        next();
      }
    })(request, response, next);
  }
  return failure(response, `User is not admin`, 'Authentication Failed', 401);
};
