const router = require('express-promise-router')();
const userService = require('../models/services/user.service');


// routes
router.post('/login', loginUser);
router.post('/register', registerUser);
//TODO: this post was get
router.post('/current', getUser);
router.put('/current', updateUser);
router.delete('/current', deleteUser);

router.post('/friend', getFriend);
router.put('/friend', addFriend);
router.delete('/friend', deleteFriend);

router.get('/email', getEmail);
router.get('/phone', getPhone);
router.get('/gender', getGender);
router.get('/address', getAddress);
router.get('/birth', getBirth);

router.post('/workout', getWorkoutPlan);
router.put('/workout', updateWorkoutPlan);
router.delete('/workout', deleteActivity);

module.exports = router;

async function deleteActivity(req, res) {
    try {
        let response = await userService.deleteActivity(req.body);
        if (response) {
            res.send({
                status: "X114",
                workoutPlan: response
            });
        }
        else {
            res.send({
                status: "X001",
                message: "no workout found"
            })
        }
    } catch (err) {
        res.send({
            status: "X004",
            message: err
        });
    }
}

async function getWorkoutPlan(req, res) {
    try {
        let response = await userService.getWorkoutPlan(req.body);
        if (response) {
            res.send({
                status: "X111",
                workoutPlan: response
            });
        }
        else {
            res.send({
                status: "X001",
                message: "no workout found"
            })
        }
    } catch (err) {
        res.send({
            status: "X001",
            message: err
        });
    }
}

async function updateWorkoutPlan(req, res) {
    try {
        let response = await userService.updateWorkoutPlan(req.body);
        if (response) {
            res.send({
                status: "X113",
                workoutPlan: response
            });
        }
        else {
            res.send({
                status: "X003",
                message: "no workout found"
            })
        }

    } catch (err) {
        res.send({
            status: "X003",
            message: err
        });
    }

}




async function loginUser(req, res) {
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
        if (response) {
            res.send({
                status: "X111",
                user: response
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
                user: response
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
                user: response
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
                user: response
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
                user: response
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
                user: response
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

async function getFriend(req, res) {
    try {
        let response = await userService.getFriend(req.body);
        if (response) {
            console.log("friend list is returned for accountId " + req.body.accountId);
            res.send({
                status: "X111",
                friendList: response
            })
        }
        else {
            console.log("no friend found or invalid accountId for user: " + req.body.accountId);
            res.send({
                status: "001",
                message: response
            })
        }

    } catch (err) {
        res.send({
            status: "X001",
            message: err
        })
    }

}

async function addFriend(req, res) {
    try {
        let response = await userService.addFriend(req.body);
        if (response) {
            console.log("add success, friend list is returned for accountId " + req.body.accountId);
            res.send({
                status: "X113",
                friendList: response
            })
        }
        else {
            console.log("failed to add new friend" + req.body.accountId);
            res.send({
                status: "003",
                message: response
            })
        }

    } catch (err) {
        res.send({
            status: "X003",
            message: err
        })
    }

}

async function deleteFriend(req, res) {
    try {
        let response = await userService.deleteFriend(req.body);
        if (response) {
            console.log("delete success, friend list is returned for accountId " + req.body.accountId);
            res.send({
                status: "X114",
                friendList: response
            })
        }
        else {
            console.log("no friend found or invalid accountId for user: " + req.body.accountId);
            res.send({
                status: "004",
                message: response
            })
        }

    } catch (err) {
        res.send({
            status: "X004",
            message: err
        })
    }
}


