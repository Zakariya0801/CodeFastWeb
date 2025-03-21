const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage(); // Store in memory (or use diskStorage)
const upload = multer({ storage })

const { register, login } = require('../controllers/AuthController');

router.post('/register', upload.single("profile_photo"), register);
router.post('/login', login);

module.exports = router;