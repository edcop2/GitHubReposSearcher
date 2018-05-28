var request = require('request');


exports.findRepoFromGitHub = function (req, res) {

    var options = {
        url: 'https://api.github.com/search/repositories?q=' + req.body.repoId + '&sort=stars&order=desc',
        headers: {
            'User-Agent': 'edcop2'
        }

    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);

            res.send(info.items);
        }
    });

};