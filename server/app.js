const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

const itemRouter = require('./src/routes/item.router');

const port = process.env.PORT || '9000';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const requestLogs = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl}`)
  next()
}

app.use(requestLogs)

app.use('/api/items', itemRouter);

app.set('port', port);

app.listen(port, function () {
  console.log('Server listen on port: '+ port);
});


module.exports = app;
