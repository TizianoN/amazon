// # REQUIRE DOTENV
require('dotenv').config();

const https = process.env.HTTPS === 'on' ? 'https' : 'http';
const host = process.env.HOST + (process.env.PORT ? ':' + process.env.PORT : '');
const port = process.env.PORT;

// # EXPRESS INIT
const express = require('express');
const app = express();

// # IMPORT ROUTES AND MIDDLEWARES
const productRouterV1 = require('./routes/v1/products');
const productRouterV2 = require('./routes/v2/products');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

// # REGISTERING MIDDLEWARES
app.use(express.json());
app.use(express.static('public'));

// # API

// | V1
app.use('/api/v1/products', productRouterV1);

// | V2
app.use('/api/v2/products', productRouterV2);

// # ERROR HANDLING
app.use(errorHandler);
app.use(notFound);

// # EXPRESS LISTEN
app.listen(port, () => {
  console.log(`Server listening at ${https}://${host}`);
});
