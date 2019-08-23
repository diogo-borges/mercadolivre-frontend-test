const express = require('express');
const cookieParser = require('cookie-parser');

const itemRouter = require('./src/routes/item.router');

const port = process.env.PORT || '9000';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/items', itemRouter);

app.set('port', port);

app.listen(port, function () {
  console.log('Server listen on port: '+ port);
});


module.exports = app;
