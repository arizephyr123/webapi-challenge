/*
{
    description:
    name:
    completed:
    }
    */

const express = require("express");

const projectHelpers = require("../data/helpers/projectModel.js");
const actionRouter = require("./actionRouter")

const router = express.Router();
// router.use("/:project_id/actions", actionRouter);

//✅
//Create
router.post("/", async (req, res) => {
  const newProj = req.body;
   await projectHelpers
    .insert(req.body)
    .then(response => {
      res
        .status(201)
        .json({ message: "Project successfully created:", response });
    })
    .catch(err => {
      console.log("project create error", err);
      res
        .status(500)
        .json({ errorMessage: "Database error: cannot create project" });
    });
});

//✅
//Read all
router.get("/", (req, res) => {
  projectHelpers
    .get()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log("project read all error", err);
      res
        .status(500)
        .json({ errorMessage: "Database error: cannot get projects" });
    });
});

//✅
//Read single
router.get("/:project_id", validateProjectId, (req, res) => {
  const id = req.project.id;
  projectHelpers
    .get(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log("project read all error", err);
      res
        .status(500)
        .json({ errorMessage: "Database error: cannot get project" });
    });
});

//✅
//Update
router.put("/:project_id", validateProjectId, (req, res) => {
  const id = req.project.id;
  projectHelpers
    .update(id, req.body)
    .then(response => {
      res
        .status(200)
        .json({ message: "Project updated successfully.", response });
    })
    .catch(err => {
      console.log("project update error", err);
      res
        .status(500)
        .json({ errorMessage: "Database error: cannot update project" });
    });
});

//
//Delete
router.delete("/:project_id", validateProjectId, (req, res) => {
  const id = req.project.id;
  projectHelpers
    .remove(id)
    .then(response => {
        res.status(200).json({ message: "Project deleted successfully.", response });
    })
    .catch(err => {
      console.log("project delete error", err);
      res
        .status(500)
        .json({ errorMessage: "Database error: cannot delete project" });
    });
});

//custom middleware

//✅
function validateProjectId(req, res, next) {
  const id = req.params.project_id;
  //see if project exists
  projectHelpers
    .get(id)
    .then(response => {
      console.log("validateProjectId 1 response", response);
      if (response === null) {
        res.status(404).json({ message: "invalid project id" });
      } else {
        req.project = response;
        next();
      }
    })
    .catch(err => {
      console.log("validateProjectId get error", project_id, err);
      res.status(500).json({
        errorMessage: "Something went wrong, please try again later."
      });
    });
};



module.exports = router;
