// mongooseInstance.js
const mongoose = require("mongoose");

const mongoDBUri =
  "mongodb+srv://user_2023_ar:BZLERIJrd2sSoAP5@cluster0.vn4zl3w.mongodb.net/Cyclone?retryWrites=true&w=majority";

//or user message

mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//create ,update,delete,read

//define schema
const userSchema = new mongoose.Schema({
  id: { type: String, require: true },
  password: { type: String, require: true },
  age: { type: String },
});

// creating the schema

const UserSchema = mongoose.model("UserSchema", userSchema);

//creaing user
async function createUser(id, password, age, res) {
  try {
    const le = await UserSchema.findOne({ id: id });
    if (!le) {
      const newuser = new UserSchema({
        id: id,
        password: password,
        age: age,
      });
      const addeddata = await newuser.save();
      console.log("user is saved ", addeddata);
      res.status(201).json({
        message: "registered",
        data: addeddata,
        datas: await UserSchema.find({}), // Use await here as well
      });
      return "done";
    } else {
      console.log("exists");
      res.status(201).json({ message: "exists" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
    console.error(error); // Log the error for debugging purposes
  }
}

// updating user
async function updateUser(username, password, age, res) {
  console.log(username, age, password);
  try {
    const finduser = await UserSchema.findOne({ id: username });
    if (finduser) {
      if (finduser.password == password) {
        finduser.age = age;
        await finduser.save();
        res.status(200).json({
          message: "User updated successfully",
          user: finduser,
          success: true,
        });
      } else {
        console.log("Wrong password");
        res.status(401).json({ error: "Wrong password", success: false });
      }
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found", success: false });
    }
  } catch (e) {
    console.error("Error updating user:", e);
    res.status(500).json({ error: "Internal Server Error", success: false });
  }
}

// delete user
async function deleteUser(username, password, res) {
  try {
    console.log(username);
    const deletedUser = await UserSchema.findOneAndDelete({
      id: username,
      password: password,
    });
    console.log(deleteUser);
    if (deletedUser) {
      console.log("user deleted");
      res.status(200).json({ message: "deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(e);
  }
}

//reading user
async function readUser(username, password, res) {
  try {
    const user = await UserSchema.find({});
    return user;
  } catch (e) {
    return "error";
  }
}

module.exports = {
  mongoose,
  UserSchema,
  createUser,
  updateUser,
  deleteUser,
  readUser,
};
