const router = require('express-promise-router')();
const userService = require('../models/services/user.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/get', getUser);
router.get('/email', getEmail);
router.get('/phone', getPhone);
router.get('/gender', getGender);
router.get('/address', getAddress);
router.get('/birth', getBirth);
router.put('/update', updateUser);
router.delete('/delete', deleteUser);


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


async function getUser(req, res) {
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
            res.send({
                status: "X104"
            });
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

async function getEmail(req, res) {
    try {
        let response = await userService.getEmail(req.body);
        if (response) {
            res.send({
                status: "X111",
                email: response.contact.email
            });
        } else {
            res.send({
                status: "X001",
                message: response
            });
        }
    } catch(err) {
        res.send({
            status: "X001",
            message: err
        });
    }
}

async function getPhone(req, res) {
    try {
        let response = await userService.getPhone(req.body);
        if (response) {
            res.send({
                status: "X111",
                phone: response.contact.phone
            });
        } else {
            res.send({
                status: "X001",
                message: response
            });
        }
    } catch(err) {
        res.send({
            status: "X001",
            message: err
        });
    }
}

async function getBirth(req, res) {
    try {
        let response = await userService.getBirth(req.body);
        if (response) {
            res.send({
                status: "X111",
                birth: response.contact.birth
            });
        } else {
            res.send({
                status: "X001",
                message: response
            });
        }
    } catch(err) {
        res.send({
            status: "X001",
            message: err
        });
    }
}

async function getGender(req, res) {
    try {
        let response = await userService.getGender(req.body);
        if (response) {
            res.send({
                status: "X111",
                gender: response.contact.gender
            });
        } else {
            res.send({
                status: "X001",
                message: response
            });
        }
    } catch(err) {
        res.send({
            status: "X001",
            message: err
        });
    }
}

async function getAddress(req, res) {
    try {
        let response = await userService.getAddress(req.body);
        if (response) {
            res.send({
                status: "X111",
                address: response.contact.address
            });
        } else {
            res.send({
                status: "X001",
                message: response
            });
        }
    } catch(err) {
        res.send({
            status: "X001",
            message: err
        });
    }
}
