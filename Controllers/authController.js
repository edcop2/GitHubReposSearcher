var dbRepo = require('../db/Repository');


exports.login = function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    dbRepo.authUser(username, password, function (result) {
        if (result.message === 'OK')
            res.send({userId: result.userId, message: 'Success'})
        else
            res.send({message: 'Error'})
    });
};

exports.signup = function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    dbRepo.createUser(username, password, function (userId) {
        if (userId === 0)
            res.send({message: 'Error'});
        else
            res.send({userId: userId, message: 'Success'});
    });
};