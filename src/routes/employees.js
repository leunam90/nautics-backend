const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const mysqlConnection = require('../database');
const { verifyToken } = require('../libs/utils');

/**
 * Get All employees
 */
router.get('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            mysqlConnection.query('SELECT * FROM t_employees', (err, rows, fields) => {
                if (!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }
            });
        }
    });
});

/**
 * Get specific employee
 */
router.get('/:id', verifyToken, (req, res) => {
    console.log('req', res);
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            const { id } = req.params;
            mysqlConnection.query('SELECT * FROM t_employees WHERE id = ?', [id], (err, rows, fields) => {
                if (!err) {
                    res.json(rows[0]);
                } else {
                    console.log(err);
                }
            });
        }
    });
});

/**
 * Create a new employee record
 */
router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { id, firstname, lastname, email, phone, id_position, id_department, id_role, status, access, password } = req.body;
            const saltRounds = 10;
            console.log('password', password);
            const hashPassword = bcrypt.hashSync(password, saltRounds);
            console.log('hashPass', hashPassword);

            const query = 'CALL employeeAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            mysqlConnection.query(query, [id, firstname, lastname, email, phone, id_position, id_department, id_role, status, access, hashPassword], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: 'Employee Saved' })
                } else {
                    console.log(err);
                }
            });
        }
    });
});

/**
 * Update an employee record
 */
router.put('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            const { firstname, lastname, email, phone, id_position, id_department, id_role, status, access, password } = req.body;
            const { id } = req.params;
            const saltRounds = 10;
            console.log('password', password);
            const hashPassword = bcrypt.hashSync(password, saltRounds);
            console.log('hashPass', hashPassword);
            const query = 'CALL employeeAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            mysqlConnection.query(query, [id, firstname, lastname, email, phone, id_position, id_department, id_role, status, access, hashPassword], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: 'Employee Updated' })
                } else {
                    console.log(err);
                }
            });
        }
    });
});

/**
 * Delete an employee record
 */
router.delete('/:id', verifyToken, (req, res) => {
    console.log(req);
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { id } = req.params;
            mysqlConnection.query('DELETE FROM t_employees WHERE id = ?', [id], (err, rows, fiedls) => {
                if (!err) {
                    res.json({ status: 'Employee deleted' });
                } else {
                    console.log(err);
                }
            });
        }
    });
});

module.exports = router;