const express = require('express');

const router = express.Router();

const CatsRouter = require('./v1/cats')

router.use('/v1', CatsRouter);

module.exports = router;