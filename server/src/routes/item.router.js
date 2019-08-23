const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller')

router.get('/', ItemController.getItems);

router.get('/:id', ItemController.getItem);

module.exports = router;
