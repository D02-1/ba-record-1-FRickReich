const createError = require('http-errors');

exports.notFound = (req, res) =>
{
    res.status(404).send(new createError.NotFound('Route existiert nicht!'));
};
