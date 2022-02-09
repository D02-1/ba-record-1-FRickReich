const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { randomId } = require('../helpers/randomId');

const adapter = new FileSync('db.json');
const db = low(adapter).get('records');

const router = express.Router();

router.route('/')
    .get((req, res) =>
    {
        const records = db;

        res.status(200).json({ message: 'alle records ausgeben', data: records });
    })
    .post((req, res) =>
    {
        const newRecord =
        {
            id: randomId(),
            title: req.body.title,
            artist: req.body.artist,
            year: req.body.year,
            price: req.body.price,
            cover: req.body.cover
        };

        db.push(newOrder).write();

        res.status(200).json({ message: 'ein record hinzufügen', data: newRecord });
    });

router.route('/:id')
    .get((req, res) =>
    {
        res.status(200).json({ message: 'ein bestimmtes record ausgeben' });
    })
    .put((req, res) =>
    {
        res.status(200).json({ message: 'ein bestimmtes record updaten' });
    })
    .delete((req, res) =>
    {
        res.status(200).json({ message: 'ein bestimmtes record löschen' });
    });

module.exports = router;
