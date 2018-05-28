var pg = require('pg');

var config = {
    user: 'yuqinpre',
    database: 'yuqinpre',
    password: 'gWiD3R7Fj09gSTpnIknJ0S8JFWLqEEoP',
    host: 'horton.elephantsql.com',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000
};

var pool = new pg.Pool(config);


exports.authUser = function (username, password, callback) {

    pool.query('SELECT * FROM "User" WHERE username = $1 AND password = $2',
        [username, password], function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                if (result.rowCount > 0) {
                    callback({message: 'OK', userId: result.rows[0].id});
                }
                else
                    callback('Error');
            }
        });

};


exports.createUser = function (username, password, callback) {
    var userId = 0;
    pool.query('INSERT INTO "User"(username, password) VALUES($1, $2) RETURNING id',
        [username, password], function (err, result) {
            if (err) {
                console.log(err);
                callback(userId);
            }
            else {
                userId = result.rows[0].id;
                callback(userId);
            }
        });
};


exports.createBookmark = function (userId, ownerName, ownerUrl, ownerAvatarUrl, repoName, repoFullName, repoGithubUrl,
                                   repoLanguage, repoDescription, repoStars, repoId, callback) {

    pool.query('INSERT INTO "SavedRepos"(name, full_name, github_url, language, description, stars, ' +
        'owner_name, owner_url,  owner_avatar_url, github_repo_id, user_id) ' +
        'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id',
        [repoName, repoFullName, repoGithubUrl, repoLanguage, repoDescription, repoStars,
            ownerName, ownerUrl, ownerAvatarUrl, repoId, userId], function (err, result) {
            if (err) {
                if (err.code === '23505') {
                    callback('Exists');
                }
                else {
                    console.log(err);
                    callback(err);
                }
            }
            else {
                if (result.rowCount > 0) {
                    callback('OK');
                }
                else
                    callback('Error');
            }
        });

};

exports.deleteBookmark = function (bookmarkId, callback) {

    pool.query('DELETE FROM "SavedRepos" WHERE id = $1', [bookmarkId], function (err, result) {
        if (err) {
            console.log(err);
            callback('Error');
        }
        else {
            if (result.rowCount > 0)
                callback('OK');
            else
                callback('None');
        }
    });
};

exports.getUsersBookmarks = function (userId, callback) {

    pool.query('SELECT * FROM "SavedRepos" WHERE user_id = $1', [userId], function (err, result) {
        if (err) {
            console.log(err);
            calback({message: 'Error'});
        }
        else {
            if (result.rowCount > 0) {
                callback({message: 'OK', data: result.rows});
            }
            else {
                callback({message: 'None'});
            }
        }
    });
};


exports.bookmarkExists = function (userId, repoId, callback) {

    pool.query('SELECT * FROM "SavedRepos" WHERE user_id = $1 AND github_repo_id = $2',
        [userId, repoId], function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                if (result.rowCount > 0)
                    callback(true);
                else
                    callback(false);
            }
        });
};