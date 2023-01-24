require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/rateLimiter');
const {
  NODE_ENV,
  MONGO_DB,
} = require('./config');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://beatfilm-vldslw.nomoredomains.club',
    'https://api.beatfilm-vldslw.nomoredomains.club',
    'http://beatfilm-vldslw.nomoredomains.club',
    'http://api.beatfilm-vldslw.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'],
  credentials: true,
};

mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : 'mongodb://localhost:27017/bitfilmsdb');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
