'use strict';

const express = require('express');
const path = require('path');

const { port } = require('./config');
const dataRouter = require('./server');

const app = express();

app.use('/', express.static(path.join(__dirname, 'client')));
app.use('/data', dataRouter);

app.listen(port, () => console.log(`App listening on http://localhost:${port}`));
