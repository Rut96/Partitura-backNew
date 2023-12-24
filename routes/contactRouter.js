const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// get all
router.get('/', (req, res)=>{
  try{
    contactController.contact_get_all(req, res);
  }catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/new', (req, res)=>{
  try{
    contactController.contact_create_new(req, res);
  }catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// get by Id
router.get('/:id', async (req, res) => {
  try {
    contactController.contact_get_byId(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// update contact 
router.put('/:id', async (req, res) => {
  try {
    contactController.contact_update(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/delete', async (req, res) => {
  try {
    contactController.contact_delete(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


module.exports = router;