const express = require('express');
var router = express.Router();
const userService = require('../models/services/user.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;

/*
    authenticateUser(req, res)
    this is a multi-purpose login function
    can login user both by accountId and username
    response = successful login will render code 200
    otherwise, print err message to 400
    (Bad request means internal error)
    (other err as string means customized err code)
 */
async function authenticateUser(req, res) {
    try {
        let response = await userService.authenticate(req.body);
        if (response === "successful login") {
            res.send(true);
        }
        else {
            res.send(response);
        }
    } catch (err) {
        res.send(err);
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

//TODO:
