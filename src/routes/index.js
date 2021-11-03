const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysqlConnection = require('../database');
const { verifyToken } = require('../libs/utils');

// router.get('/', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretKey', (err, authData) => {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: 'Access granted',
//                 authData: authData
//             });
//         }
//     });
// });
router.get('/', (req, res) => {
    res.json({});
});

module.exports = router;