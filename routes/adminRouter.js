const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/stats', async (req, res) => {
    try {
        adminController.get_stats(req, res);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  


module.exports = router;