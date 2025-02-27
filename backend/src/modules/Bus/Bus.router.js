const express = require('express');
const router = express.Router();
const busController = require('./controller/Bus.controller');


router.get('/', busController.getAllBuses); 

router.post('/', busController.createBus);  

router.put('/:id', busController.updateBus);

router.delete('/:id', busController.deleteBus);

module.exports = router;