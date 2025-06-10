const { Router } = require('express');
const navigatorController = require('../controllers/navigatorController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/data', authMiddleware, navigatorController.getData);

module.exports = router;