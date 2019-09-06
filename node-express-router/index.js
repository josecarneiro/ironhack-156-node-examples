const express = require('express');

const app = express();

const router = require('./router');

app.use(router);
// app.use('/information', router);

app.listen(3000);
