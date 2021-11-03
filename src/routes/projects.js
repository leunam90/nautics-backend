const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const mysqlConnection = require('../database');
const { verifyToken } = require('../libs/utils');

router.get('/', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            mysqlConnection.query('SELECT * FROM t_projects', (err, rows, fields) => {
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
            mysqlConnection.query('SELECT * FROM t_projects WHERE id = ?', [id], (err, rows, fields) => {
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
    console.log(req.body);
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const { id, description, created_by, asigned_to, id_harbor, start_date, end_date, start_week, end_week } = req.body;

            const query = 'CALL projectAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?)';
            mysqlConnection.query(query, [id, description, created_by, asigned_to, id_harbor, start_date, end_date, start_week, end_week], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: 'Project Saved' })
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
            const { description, created_by, asigned_to, id_harbor, start_date, end_date, start_week, end_week } = req.body;
            const { id } = req.params;
            const query = 'CALL projectAddOrEdit(?, ?, ?, ?, ?, ?, ?, ?, ?)';
            mysqlConnection.query(query, [id, description, created_by, asigned_to, id_harbor, start_date, end_date, start_week, end_week], (err, rows, fields) => {
                if (!err) {
                    res.json({ status: 'Project Saved' })
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
            mysqlConnection.query('DELETE FROM t_projects WHERE id = ?', [id], (err, rows, fiedls) => {
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