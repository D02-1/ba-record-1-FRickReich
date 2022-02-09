const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { randomId } = require('../utils/randomId');
const createError = require('http-errors');

const adapter = new FileSync('db.json');
const db = low(adapter).get('orders');
 
const router = express.Router();

router.route('/')
    .get((req, res) =>
    {
        const orders = db;

        res.status(200).json({ message: 'Alle orders ausgeben', data: orders });
    })
    .post((req, res) =>
    {
        const newOrder =
        {
            id: randomId(),
            productId: req.body.productId,
            quantity: req.body.quantity
        };

        db.push(newOrder).write();

        res.status(200).json({
            message: `Order "${ newOrder.id }" Hinzugefügt: ${newOrder.quantity}x ${newOrder.productId}`,
            data: newOrder
        });
    });

router
    .route('/:id')
    .get((req, res) =>
    {
        const id = req.params.id;

        const selectedOrder = db.find({ id }).value();

        if(selectedOrder)
        {
            res.status(200).json({
                message: 'eine bestimmte order ausgeben',
                data: selectedOrder
            });
        }
        else
        {
            res.status(404).send(new createError.NotFound('Order existiert nicht!'));
        }
    })
    .put((req, res) =>
    {
        const id = req.params.id;

        const selectedOrder = db.find({ id }).assign({
            productId: req.body.productId,
            quantity: req.body.quantity
        }).write();

        if(selectedOrder)
        {
            res.status(200).json({
                message: 'eine bestimmte order updaten',
                data: selectedOrder
            });
        }
        else
        {
            res.status(404).json({ message: 'Order nicht gefunden' });
        }
    })
    .delete((req, res) =>
    {
        const id = req.params.id;

        db.remove({ id }).write();

        res.status(200).json({ message: 'eine bestimmte order löschen' });
    });

module.exports = router;
