const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { randomId } = require('../utils/randomId');

const adapter = new FileSync('db.json');
const db = low(adapter).get('users');

const router = express.Router();

router.route('/')
    .get((req, res) =>
    {
        const users = db;

        res.status(200).json({ message: 'alle user ausgeben', data: users });
    })
    .post((req, res) =>
    {
        const newUser =
        {
            id: randomId(),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };

        db.push(newOrder).write();

        res.status(200).json({ message: 'einen user hinzufügen', data: newUser });
    });

router.route('/:id')
    .get((req, res) =>
    {
        res.status(200).json({ message: 'einen bestimmten user ausgeben' });
    })
    .put((req, res) =>
    {
        res.status(200).json({ message: 'einen bestimmten user updaten' });
    })
    .delete((req, res) =>
    {
        res.status(200).json({ message: 'einen bestimmten user löschen' });
    });

module.exports = router;
