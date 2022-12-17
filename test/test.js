const Task = require("../models/Task");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
chai.should();
 
chai.use(chaiHttp);
 
describe("Tasks", () => {
  beforeEach((done) => {
    Task.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET task", () => {
    it("it should GET all the Tasks", (done) => {
      chai
        .request(app)
        .get("/api/tasks")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  describe("/POST task", () => {
    it("it should new POST a task", (done) => {
      let task = {
        title: "This is the first task",
        body: "This is a task post",
        status: true
      };
      chai
        .request(app)
        .post("/api/tasks")
        .send(task)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });
  describe("/GET/:id task", () => {
    it("it should GET a task by the id", (done) => {
      let task = new Task({
        title: "This is the first task",
        body: "This is a task post",
        status: false
      });
      task.save((err, task) => {
        chai
          .request(app)
          .get("/api/tasks/" + task.id)
          .send(task)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/PUT/:id task", () => {
    it("it should UPDATE a task given the id", (done) => {
      let task = new Task({
        title: "This is the first task",
        body: "This is a task post",
        status: true
      });
      task.save((err, task) => {
        console.log(task.id);
        chai
          .request(app)
          .put("/api/tasks/" + task.id)
          .send({
            title: "The first task was updated",
            body: "This is a task post",
            status: false
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
  describe("/DELETE/:id task", () => {
    it("it should DELETE a task given the id", (done) => {
      let task = new Task({
        title: "This is the first task",
        body: "This is a task post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      });
      task.save((err, task) => {
        chai
          .request(app)
          .delete("/api/tasks/" + task.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.should.be.a("object");
            res.body.status.should.be.eql("success");
            done();
          });
      });
    });
  });
});