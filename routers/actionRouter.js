/*
{
    project_id: 
    description: 
    notes: 
    completed:
}
*/

const express = require("express");

const actionHelpers = require("../data/helpers/actionModel.js");
const projectHelpers = require("../data/helpers/projectModel.js");

const router = express.Router();
router.use(actionProjectId);

//Create
router.post("/:project_id", async (req, res) => {
    console.log(req.originalUrl)
    console.log("req.projectId", req.projectId);
    console.log("req.params", req.params);
    console.log("req.body", req.body);
  await actionHelpers
    .insert({...req.body, ...req.params})
    .then(response => {
      res
        .status(201)
        .json({ message: "action successfully created:", response });
    })
    .catch(err => {
      console.log("action create error", err);
      res
        .status(500)
        .json({ errorMessage: "Database error: cannot create action" });
    });
});

//Read all
router.get("/", (req, res) => {});

//Read single
router.get("/:id", (req, res) => {});

//Update
router.put("/:id", (req, res) => {});

//Delete
router.delete("/:id", (req, res) => {});

//middleware
async function actionProjectId (req, res, next) {
  const id = req.params.id;
  console.log("validateProjectId id", id);
  //see if project exists
   await projectHelpers
    .get(id)
    .then(response => {
      //console.log("validateProjectId response", response);
      if (response === null) {
        res.status(404).json({ message: "invalid project id" });
      } else {
        req.projectId = id;
        next(req.projectId);
      }
    })
    .catch(err => {
      console.log("validateProjectId get error", project_id, err);
      res.status(500).json({
        errorMessage: "Something went wrong, please try again later."
      });
    });
}

module.exports = router;
