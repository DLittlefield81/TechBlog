const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;