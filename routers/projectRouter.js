// {
//     description: 
//     notes: 
//     completed:
//     }

const express = require("express");

const projectHelpers = require("../data/helpers/projectModel.js");

const router = express.Router();

//Create
router.post("/", (req, res) => {});

//Read all
router.get("/", (req, res) => {});

//Read single
router.get("/:id", (req, res) => {});

//Update
router.put("/:id", (req, res) => {});

//Delete
router.delete("/:id", (req, res) => {});

module.exports = router;
