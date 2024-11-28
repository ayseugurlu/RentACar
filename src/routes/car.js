"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();

const {list, read, create, update, deleteCar} = require('../controllers/car')
/* ------------------------------------------------------- */
// routes/car:

router.route('/')
    .get(list)
    .post(create)

router.route('/:id')
    .get(read)
    .put(update)
    .patch(update)
    .delete(deleteCar)
    
module.exports = router;
