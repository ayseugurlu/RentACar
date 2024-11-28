"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Car Controller:

const Car = require("../models/car");

module.exports = {
  list: async (req, res) => {

    const result = await res.getModelList(Car)

    res.status(200).send({
      error:false,
      result,
      details: await res.getModelListDetails(Car)
    })

  },

  create: async (req, res) => {

    const result = await Car.create(req.body)

    res.status(201).send({
      error: false,
      result
    })
  },

  read: async (req, res) => {

    const result = await Car.findOne({_id: req.params.id})

    res.status(200).send({
      error: false,
      result
    })
  },

  update: async (req, res) => {
    const result = await Car.updateOne({_id: req.params.id}, req.body, {new:true, runValidators:true})

    res.status(202).send({
      error: false,
      result
    })
  },

  deleteCar: async (req, res) => {

    const result = await Car.deleteOne({_id: req.params.id})

    res.status(result.deletedCount ? 204 : 404).send({
      error: !result.deletedCount,
      result
    })

  },
};
