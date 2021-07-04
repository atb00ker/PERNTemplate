let express = require('express');
let router = express.Router();
let home = require('./src/controllers/home');

router.get('/', home.get_landing);

module.exports = router;
