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

function authenticateUser(req, res) { res.send("a user?")}
function registerUser(req, res) {}
function getCurrentUser(req, res) {}
function updateUser(req, res) {}
function deleteUser(req, res) {}

/*
    HTTP Method Reference:
    post = create/send
    get = read
    put = update/replace
    patch = update/modify
    delete = delete
 */
