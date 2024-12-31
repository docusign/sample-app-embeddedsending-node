const { Router } = require('express');
const envelopesController = require('../controllers/envelopesController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/list', authMiddleware, envelopesController.getEnvelopes);
router.post('/:envelopeId/edit', authMiddleware, envelopesController.editEnvelope);

module.exports = router;
