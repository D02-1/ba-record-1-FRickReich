require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');

const app = express();
const port = process.env.PORT;
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const randomId = () => Math.random().toString(36).substr(2, 9);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (!db.get('records'))
{
    db.defaults({ records: [] }).write();
}

app.get('/api/records', (req, res) =>
{
    const records = db.get('records');

    res.status(200).json(records);
});
app.post('/api/records', (req, res) =>
{
    console.log(req.body);
    
    const {
        title, 
        artist, 
        year, 
        price
    } = req.body;

    db.get('records').push({
        id: randomId(),
        title,
        artist,
        year,
        price
    }).write();

    res.status(201).json({ message: `Eintrag für ${ title } von ${ artist } hinzugefügt!` });
});

app.listen(port, () => console.log(`Server läuft auf port ${ port}`));
