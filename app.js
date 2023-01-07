require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://bitfilms-vldslw.nomoredomains.club',
    'https://api.bitfilms-vldslw.nomoredomains.club',
    'http://bitfilms-vldslw.nomoredomains.club',
    'http://api.bitfilms-vldslw.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'],
  credentials: true,
};

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const { PORT = 3000 } = process.env;
const app = express();

app.use('*', cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
