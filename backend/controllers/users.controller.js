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
    let response = await userService.authenticate(req.body);
    if (response === "successful login") {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400).send(response);
    }
}

/*
    registerUser(req, res):
    send status 200 when registration success
    otherwise, send 400 with error code: response
    response follows same format as function authenticate()
 */
async function registerUser(req, res) {
    let response = await userService.create(req.body);
    if (response === "successful registration") {
        res.sendStatus(200);
    }
    else {
        res.sendStatus(400).send(response);
    }
}

function getCurrentUser(req, res) {res.send(true)}
function updateUser(req, res) {res.send(true)}
function deleteUser(req, res) {res.send(true)}

/*
    HTTP Method Reference:
    post = create/send
    get = read
    put = update/replace
    patch = update/modify
    delete = delete
 */
