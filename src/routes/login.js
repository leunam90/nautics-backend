const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysqlConnection = require('../database');

router.post('/', (req, res) => {
    console.log(req.body);
    const user = req.body;
    const { email, password } = req.body;
    console.log('request body', req.body);
    const saltRounds = 10;
    console.log('password', password);

    //Find the user in database
    mysqlConnection.query('SELECT * FROM t_employees WHERE email = ?', [email], (err, rows, fields) => {
        if (!err) {
            console.log('rows', rows);
            if (rows.length > 0) {
                const accessGranted = bcrypt.compareSync(password, rows[0].password);
                //if exist user in database create token 
                if (accessGranted) {
                    jwt.sign({ user }, 'secretKey', { expiresIn: '1h' }, (err, token) => {
                        res.json({ message: 'Access Granted', token });
                    });
                } else {
                    res.json({ message: 'Access Denied' });
                }
            } else {
                res.json({ message: 'No rows found' });
            }


        } else {
            console.log(err);
        }
    });
});

module.exports = router;