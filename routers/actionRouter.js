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

//✅
//Create
router.post("/:project_id", async (req, res) => {
  //   console.log(req.originalUrl);
  //   console.log("req.projectId", req.projectId);
  //   console.log("req.params.project_id", req.params.project_id);
  //   console.log("req.params", req.params);
  //   console.log("req.body", req.body);
  await actionHelpers
    .insert({ ...req.body, ...req.params })
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

//✅
//Read all for project
router.get("/:project_id", (req, res) => {
  const id = req.params.project_id;
  projectHelpers
    .getProjectActions(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log("actions read all error", err);
      res.status(500).json({
        errorMessage: "Database error: cannot get actions for this project"
      });
    });
});

//
// //Read single
// router.get("/:project_id", (req, res) => {
//   const projId = req.params.project_id;
//   projectHelpers
//     .getProjectActions(projId)
//     .then(response => {
//       if (response !== null) {
//         const projActions = response.actions;
//         const selected = response.actions.filter(a => a.id === req.body.id);
//         res.status(222).json(selected);
//       } else {
//         res.status(403).json({ message: "This project has no actions." });
//       }
//     })
//     .catch(err => {
//       console.log("actions read all error", err);
//       res.status(500).json({
//         errorMessage: "Database error: cannot get actions for this project"
//       });
//     });
// });

//✅
//Read single
router.get("/", (req, res) => {
  actionHelpers
    .get(req.body.id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log("actions read all error", err);
      res.status(500).json({
        errorMessage: "Database error: cannot get actions for this project"
      });
    });
});

//Update
router.put("/", (req, res) => {
    const id = req.body.id;
    actionHelpers.update(id,req.body.changes)
    .then(response => {
        res.status(200).json (response)
        .catch(err => {
            console.log("actions update error", err)
            res.status(500).json({
                errorMessage: "Database error: cannot update this action"
              })
        })
    })
});

//Delete
router.delete("/", (req, res) => {
    actionHelpers.remove(req.body.id)
    .then(response => {
        res.status(200).json({ message: "deleted", response })
    })
    .catch(err => {
        console.log("actions update error", err)
        res.status(500).json({
            errorMessage: "Database error: cannot delete this action for this project"
          })
    })
});

//middleware
async function actionProjectId(req, res, next) {
  const id = req.params.project_id;
  //see if project exists
  await projectHelpers
    .get(id)
    .then(response => {
      //console.log("validateProjectId response", response);
      if (response === null) {
        res.status(404).json({ message: "invalid project id" });
      } else {
        req.projectId = id;
        next();
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
