const express = require("express");
const router = express.Router();
const {
  getGoals,
  updateGoal,
  setGoal,
  deleteGoal
} = require("../controllers/goalController");

// @desc cleaner way to write goal if route is same for all request
 
router.route("/").get(getGoals).post(setGoal);
router.route("/:id").put(updateGoal).delete(deleteGoal);


module.exports = router;
