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
            }
            );
        }
    } catch (err) {
        res.send({
                status: "X003",
                message: err
            }
        );
    }
}

/*
    registerUser(req, res):
    send status 200 when registration success
    otherwise, send 400 with error code: response
    response follows same format as function authenticate()
 */
async function registerUser(req, res) {
    try {
        let response = await userService.register(req.body);
        if (response === "successful registration") {
            res.sendStatus(200);
        }
        else {
            res.send(response);
        }
    } catch (err) {
        res.send(err);
    }
}

/*
    getCurrentUser(req,res):
    send status 200 when query by ID is success
    otherwise, send 400 with error code: response
*/
async function getCurrentUser(req, res) {
    try {
        let response = await userService.getByEither(req.body);
        if (response === "successful query - id" || response === "successful query - name") {
            res.sendStatus(200);
        } else {
            res.send(response);
        }
    } catch (err) {
        res.send(err);
    }
}

/*
    updateUser(req,res):
    send status 200 when update by query is success
    otherwise, send 400 with error code: response
*/
async function updateUser(req, res) {
    try {
        let response = await userService.update(req.body);
        if (response === "successful") {
            res.sendStatus(200);
        } else {
            res.send(response);
        }
    } catch (err) {
        res.send(err);
    }
}

/*
    deleteUser(req,res):
    send status 200 when delete by accountId is success
    otherwise, send 400 with error code: response
*/
async function deleteUser(req, res) {
    try {
        let response = await userService.delete(req.body);
        if (response === "successful") {
            res.sendStatus(200);
        } else {
            res.send(response);
        }
    } catch (err) {
        res.send(err);
    }
}

/*
    HTTP Method Reference:
    post = create/send
    get = read
    put = update/replace
    patch = update/modify
    delete = delete
 */

