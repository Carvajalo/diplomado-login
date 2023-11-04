const sessionController = require('../controllers/session.controller');
const router = require('express').Router();

router.post('/login', sessionController.login);
router.post('/signup', sessionController.signup);

module.exports = router
