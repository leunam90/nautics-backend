const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysqlConnection = require('../database');
const { verifyToken } = require('../libs/utils');

router.get('/', (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            mysqlConnection.query('SELECT * FROM c_roles', (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }
            });
        }
    });
});

module.exports = router;