"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Reservation Controller:
const Reservation = require("../models/reservation");
const User = require( '../models/user')
const dateValidation = require('../helpers/dateValidation')

module.exports = {
  list: async (req, res) => {

    const result = await res.getModelList(Reservation)

    res.status(200).send({
      error:false,
      result,
      details: await res.getModelListDetails(Reservation)
    })
  },

  create: async (req, res) => {

    const {userId, carId, startDate, endDate} = req.body

    if(!(userId && carId && startDate && endDate )){
      res.errorStatusCode = 400
      throw new Error('userId , carId startDate and endDate are required!')
    }

    const user = await User.findOne({_id : userId})

    if( !(user && user.isActive)){
      res.errorStatusCode = 401
      throw new Error('User is not active.')
    }

    const reservation = await Reservation.findOne({userId})

    if(reservation && reservation.carId == carId){
      res.errorStatusCode = 400
      throw new Error('You have already booked this car')

    }else{

    const dateValidationArray = dateValidation(startDate,endDate)

    req.body.startDate = dateValidationArray[0]
    req.body.endDate = dateValidationArray[1]

    if(reservation.startDate !== dateValidationArray[0] && reservation.endDate !== dateValidationArray[1] ){


      const newReservation = await Reservation.create(req.body)

      res.status(202).send({
        error:false,
        result: newReservation,
      })
    }



    }
  },

  read: async (req, res) => {
    const result = await Reservation.findOne({_id: req.params.id})

    res.status(200).send({
      error: false,
      result
    })
  },

  update: async (req, res) => {
    const result = await Reservation.updateOne({_id:req.params.id}, req.body, {new:true, runValidators:true})

    res.status(202).send({
      error: false,
      result
    })
  },

  delete: async (req, res) => {
    const result = await Reservation.deleteOne({_id:req.params.id})

    res.status(result.deletedCount ? 204 :404 ).send({
      error: !result.deletedCount,
      result
    })
  },
};
