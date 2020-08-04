const express = require("express");
const router = express.Router();
const Project = require("../database/models/project");
const User = require("../database/models/user");

router.post("/create", (req, res) => {
  let errors = [];
  const { name, tasks } = req.body;
  if (!req.session.passport.user || !name || !tasks.length > 0) { //crazy balls error checking 
    if (!req.session.passport.user) {
      errors.push({ msg: "You need to sign in to use this feature" });
    }
    if (!name) {
      errors.push({ msg: "Please give this project a name" });
    }
    if (!(tasks.length > 0)) {
      errors.push({ msg: "You need atleast one task in each project" });
    }
    if (errors.length > 0) {
      res.json({ errors });
    }
  } else {
    console.log("hello");
    User.findById(req.session.passport.user, {
      username: true, //only graps the username field from the User model
    }).then((data) => {
      try {
        let username = data.username;
        let id = data.id;
        let owner = { username, id };
        Project.findOne({ name, owner }).then((project) => {
          if (project) {
            errors.push({ msg: "you already have a project with that name" });// more garbage error checking
            res.json({ errors });
          } else {
            console.log("open");
            let project = new Project({ owner, name, tasks });
            project.save(); //save the new Project to the database
            res.json({ success: "new project created" });
          }
        });
      } catch (err) {
        console.log(err);
        res.json("failed to fetch user"); // this probably doesnt need to be here i just like try - catch statements
      }
    });
  }
});

router.get("/:id", (req, res) => { //this was in the actual application this was replaace with a socket method 
  try {                             // keep it open for api testing
    if (!req.session.passport.user) {
      res.json({ error: { msg: "You need to sign in to use this feature" } });
    }
    console.log("=====PROJECT=====");
    console.log(req.params);
    Project.findById(req.params.id).then((project) => {
      if (project) {
        console.log("PROJECT");
        res.json({ project });
      } else {
        res.json({ error: { msg: "Could not find Project" } });
      }
    });
  } catch {
    res.json({ error: { msg: "could not get user" } });
  }
});
router.post("/update", (req, res) => { // updates project with the new changes made 
  Project.findByIdAndUpdate(           // this could easily be replaced by socket methods but i didnt feel like making them
    req.body.id,
    req.body.project,
    { new: true },
    (err, place) => {
      if (err) {
        res.json({ error: { msg: "could not find  Project" } });
      } else {
        res.json({ success: { msg: "updated successfully" } });
      }
    }
  );
});

router.post("/delete", (req, res) => { // DELETE DELETE DELETE DELETE DELETE DELETE DELETE
  console.log(req.body);
  if (!req.session.passport.user) {
    res.json({ error: { msg: "You need to sign in to use this feature" } });
  } else {
    Project.findByIdAndDelete(req.body.id)
      .then(() => {
        res.json({ success: { msg: "Deleted project successfully" } });
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: { msg: "Failed to delete project" } });
      });
  }
});
module.exports = router;
