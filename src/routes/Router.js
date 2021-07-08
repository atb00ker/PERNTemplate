let express = require('express'),
  router = express.Router(),
  index = require('../controllers/Index'),
  pern = require('../controllers/Pern');

// Pern
router.get('/ws/pernsocket/:socket_info', pern.update_websocket);
router.get('/pern/:pern_id', pern.get_pern_details);
router.put('/pern/:pern_id', pern.put_pern_details);
router.delete('/pern/:pern_id', pern.delete_pern_details);
router.post('/pern', pern.create_pern);
router.get('/pern', pern.get_pern);
// Index
router.get('/', index.htmlPage);

module.exports = router;
