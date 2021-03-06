const express = require('express');
const cors = require('cors');
const api = require('./routes/api');

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', api);

app.listen(PORT);
