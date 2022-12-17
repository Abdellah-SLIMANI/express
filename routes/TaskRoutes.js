const express = require("express");
const {createTask,deleteTask,getAllTasks,getTaskById,updateTask} = require("../controllers/TaskController")
 
const router = express.Router();
 
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);
 
module.exports = router;