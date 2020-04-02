const express = require('express');

const router = express.Router();

// first test route
router.get('/', (request, response) => response.status(200).json({foo: 'bar'}));
router.get('/status', (request, response) => response.status(200).send('RUNNING'));

module.exports = router;