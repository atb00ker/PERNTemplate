import express from "express";

import { html_page } from "../controllers/Index";
import { update_websocket, get_pern_details, put_pern_details,
  delete_pern_details, create_pern, get_pern } from "../controllers/Pern";
const router = express.Router();

// Pern
router.get('/ws/pernsocket/:socket_info', update_websocket);
router.get('/pern/:pern_id', get_pern_details);
router.put('/pern/:pern_id', put_pern_details);
router.delete('/pern/:pern_id', delete_pern_details);
router.post('/pern', create_pern);
router.get('/pern', get_pern);
// Index
router.get('/', html_page);

export default router;
