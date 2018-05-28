var express = require('express');
var router = express.Router();


var searchControler = require('../Controllers/searchController');
// /* GET search listing. */
// router.get('/:repoId', function(req, res) {
//
//     var options = {
//         url : 'https://api.github.com/search/repositories?q='+req.params.repoId+'&sort=stars&order=desc',
//         headers : {
//             'User-Agent' : 'edcop2'
//         }
//
//     };
//
//     request(options, callback);
//
//
//     res.send('No '+ req.params.repoId);
// });


/* GET search listing. */
router.post('/', searchControler.findRepoFromGitHub);


module.exports = router;
