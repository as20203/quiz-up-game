import { config } from 'dotenv';
config();

//Loading and registering absolute paths
import { register } from 'tsconfig-paths';
import { compilerOptions } from './tsconfig.json';
import { join } from 'path';
const baseUrl = join(__dirname, 'apis');
register({
  baseUrl,
  paths: compilerOptions.paths
});
import express, { Application } from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import swaggerJSDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app: Application = express();
const port = process.env.PORT || 5000;
//Setting up bodyParser
app.use(json()); // support json encoded bodies
app.use(urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
const corsOptions = {
  origin: ['http://localhost:3000', 'https://dev.radonapp.net', 'http://dev.radonapp.net'],
  credentials: true
};
app.use(cors(corsOptions));
// MongoDB terminal connection string
// mongo "mongodb+srv://cluster0-bpzyc.mongodb.net/radon-app" --username jawadzaheer123
// Setting up database connection.
const db = process.env.DATABASE_URL || 'mongodb://localhost/quiz-up';
const databaseConnection = (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        // eslint-disable-next-line no-console
        return console.log(`Successfully connected to ${db}`);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};

databaseConnection(db);

// Importing authMiddleware
import { authenticateUser } from '~/middleware';
authenticateUser(passport);
//Importing routes
import { authenticationRouter, userRouter, categoryRouter } from '~/routes';
app.use('/api/users', userRouter);
app.use('/api/auth', authenticationRouter);
app.use('/api/categories', categoryRouter);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Quiz Game APIs',
    version: '1.0.0'
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./apis/controllers/**/**.ts']
};
// import { hello } from '~/routes';
const swaggerSpec = swaggerJSDoc(options);

//setup base route for each router
app.use(passport.initialize());
app.use(passport.session());

app.use('/docs', serve, setup(swaggerSpec));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(join(__dirname, 'frontend/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(_, res) {
    res.sendFile(join(__dirname, 'frontend/build', 'index.html'));
  });
}

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App started on port ${port}!`);
});
