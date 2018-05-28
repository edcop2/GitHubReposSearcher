var dbRepo = require('../db/Repository');


exports.addBookmark = function (req, res) {

    dbRepo.createBookmark(req.body.userId, req.body.ownerName, req.body.ownerUrl, req.body.ownerAvatarUrl,
        req.body.repoName, req.body.repoFullName, req.body.repoGithubUrl, req.body.repoLanguage,
        req.body.repoDescription, req.body.repoStars, req.body.repoId, function (result) {
            if (result === 'OK')
                res.send({message: 'Success'});
            else if (result === 'Exists') {
                res.send({message: 'Exists'})
            }
            else
                res.send({message: 'Error'});
        });
};

exports.deleteBookmark = function (req, res) {

    dbRepo.deleteBookmark(req.body.bookmarkId, function (result) {
        if (result === 'OK')
            res.send({message: 'OK'});
        else if (result === 'None')
            res.send({message: 'None'});
        else
            res.send({message: 'Error'});

    });

};


exports.getUserBookmarks = function (req, res) {

    dbRepo.getUsersBookmarks(req.body.userId, function (result) {
        if (result.message === 'OK') {
            res.send({message: 'OK', data: result.data});
        }
        else if (result.message === 'None') {
            res.send({message: 'None'});
        }
        else {
            res.send({message: 'Error'});
        }

    });
};