const express = require("express");
const app = express();
const mongoose = require("mongoose");
const taskRouter = require("./routes/TaskRoutes");
const port = 1500;

//configure mongoose
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/CRUD",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to MongoDB");
      }
    }
  );
 
//middleware
app.use(express.json());
app.use("/api/tasks", taskRouter);
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 
module.exports = app;