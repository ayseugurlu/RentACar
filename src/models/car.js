"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
/* ------------------------------------------------------- *
{
    "plateNumber": "34ABC123",
    "brand": "Ford",
    "model": "Focus",
    "year": 2020,
    "isAutomatic": true,
    "pricePerDay": 249.99
}
{
    "plateNumber": "34ABC234",
    "brand": "Renault",
    "model": "Megane",
    "year": 2022,
    "isAutomatic": false,
    "pricePerDay": 199.99
}
{
    "plateNumber": "34ABC345",
    "brand": "Opel",
    "model": "Astra",
    "year": 2021,
    "isAutomatic": false,
    "pricePerDay": 189.99,
    "isPublish": false
}
/* ------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
const uniqueValidator = require("mongoose-unique-validator");
// Car Model:

const CarSchema = new mongoose.Schema(
  {
    plateNumber:{
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    brand:{
      type: String,
      required: true,
      trim:true,
    },

    model:{
      type: String,
      required: true,
      trim:true
    },

    year: {
      type: Number,
      required:true,
    },

    isAutomatic: {
      type: Boolean,
      default:false
    },

    pricePerDay: {
      type: Number,
      required:true
    },

    isPublish: {
      type: Boolean,
      required:true
    },

    createdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedId : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }

  },
  {
    collection: "cars",
    timestamps: true,
  },
);

CarSchema.plugin(uniqueValidator, {
  message: "This {PATH} is exist",
});
// Export:

module.exports = mongoose.model("Car", CarSchema);
// Car Model:
