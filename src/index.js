require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');
const createError = require('http-errors');

const { orderRoutes, recordRoute, userRoutes } = require('./routes/');
const { security } = require('./middleware/security');

const app = express();
const port = process.env.PORT;
const adapter = new FileSync('db.json');
const db = low(adapter);

if (!db.get('records'))
{
    db.defaults({ records: [], orders: [], users: [] }).write();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(security);

app.use('/api/records', recordRoute);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.all('*', (req, res) =>
{
    res.status(404).send(new createError.NotFound('Route existiert nicht!'));
});

app.listen(port, () => console.log(`Server läuft auf port ${ port}`));
