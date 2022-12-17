const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const taskSchema = new Schema({
  title: String,
  body: String,
  status: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
module.exports = mongoose.model("Task", taskSchema);