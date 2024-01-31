const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./mongoose.js");
const {
  createUser,
  deleteUser,
  updateUser,
  readUser,
} = require("./mongoose.js");
const { UserSchema } = require("./mongoose.js");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("server started in backend of port 3001");
});

//create
app.post("/api/data", async (req, res) => {
  try {
    const { id, password, age } = req.body;
    await createUser(id, password, age, res);
  } catch (e) {
    console.log(e);
  }
});

//check th user is exixt
app.post("/api/login", async (req, res) => {
  const { id, password } = req.body;
  const le = await UserSchema.findOne({ id: id });
  if (!le) {
    console.log("user not exist");
    res.status(201).json({ message: "register" });
  } else {
    res.status(201).json({ message: "exists", id: id,age:le.age });
  }
});

//read
app.post("api/read", async (req, res) => {
  const { id, password } = req.body;
  console.log(id,password);
  try {
    const le = await UserSchema.findOne({  id });
    if (le) {
      res.status(201).json({ message: "found ", user: le });
    } else {
      res.status(201).json({ message: "not found" });
    }
  } catch (e) {
    console.log(e);
  }
});

//delete
app.delete("/api/data", async (req, res) => {
  console.log("delte");
  try {
    const { username, password, age } = req.body;
    deleteUser(username, password, res);
  } catch (e) {
    console.log(e);
  }
});

//update
app.post("/api/data/update", async (req, res) => {
  try {
    const { username, password, age } = req.body;
    // console.log(req.body);
    await updateUser(username, password, age, res);
  } catch (e) {
    console.log(e);
  }
});



app.listen(3001, () => {
  console.log("server started in backend of port 3001");
});
