const express = require('express');
const router = require('express-promise-router')();
const userService = require('../models/services/user.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);


module.exports = router;

/*
    status code
    Xabc
    a = 0 or 1, 1 for success http request
    b = 0 or 1, i for if return value (besides Error) is included
    c = 1 or 2 or 3 or 4
        GET
        PUT (register, add new, etc)
        POST (update)
        DELETE
 */

async function authenticateUser(req, res) {
    try {
        let response = await userService.authenticate(req.body);
        if (response === "successful login") {
            res.send({
                status: "X103"
            });
        }
        else {
            res.send({
                status: "X003",
                message: response
            });
        }
    } catch (err) {
        res.send({
                status: "X003",
                message: err
            });
    }
}

async function registerUser(req, res) {
    try {
        let response = await userService.register(req.body);
        if (response === "successful registration") {
            res.send({
                status: "X103"
            });
        }
        else {
            res.send({
                status: "X003",
                message: response
            });
        }
    } catch (err) {
        res.send({
            status: "X003",
            message: err
        });
    }
}


async function getCurrentUser(req, res) {
    try {
        let response = await userService.getByEither(req.body);
        if (response === "successful query - id" || response === "successful query - name") {
            res.send({
                status: "X111",
                //TODO:need to send a JSON that represents user
            });
        } else {
            res.send({
                status: "X001",
                message: response
            });
        }
    } catch (err) {
        res.send({
            status: "X001",
            message: err
        });
    }
}

async function updateUser(req, res) {
    try {
        let response = await userService.update(req.body);
        if (response === "successful") {
            res.send({
                status: "X102"
            })
        } else {
            res.send({
                status: "X002",
                message: response
            });
        }
    } catch (err) {
        res.send({
            status: "X002",
            message: response
        });
    }
}

async function deleteUser(req, res) {
    try {
        let response = await userService.delete(req.body);
        if (response === "successful") {
            res.sendStatus(200);
        } else {
            res.send({
                status: "X004",
                message: response
            });
        }
    } catch (err) {
        res.send({
            status: "X004",
            message: err
        });
    }
}
