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

function authenticateUser(req, res) { res.send(true)}
function registerUser(req, res) {res.send(true)}
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
