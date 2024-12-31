const { Router } = require('express');
const templatesController = require('../controllers/templatesController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/list', authMiddleware, templatesController.getTemplates);
router.post('/create', authMiddleware, templatesController.createDefaultTemplates);
router.post('/:templateId/edit', authMiddleware, templatesController.editTemplate);

module.exports = router;
