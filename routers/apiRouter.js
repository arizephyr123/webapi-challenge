const express = require('express');

const projectRouter = require('./projectRouter');
const actionRouter = require('./actionRouter');

const router = express.Router();

router.use('/projects', projectRouter);
router.use('/actions', actionRouter);

module.exports = router;