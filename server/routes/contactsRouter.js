const { Router } = require('express');
const contactsController = require('../controllers/contactsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/send', authMiddleware, contactsController.sendEnvelope);
router.get('/list', authMiddleware, contactsController.getContacts);
router.post('/create', authMiddleware, contactsController.createContact);
router.post('/createDefaultContacts', authMiddleware, contactsController.createDefaultContacts);

module.exports = router;
