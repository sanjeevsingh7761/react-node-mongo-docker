const express = require("express");
const app = express();
const mongoose = require("mongoose");


// configuration ===============================================================
mongoose.connect(process.env.CUSTOMCONNSTR_MyConnectionString || database.localUrl); 

// mongoose.connect("mongodb://mongo:27017/docker-demo", {
//   useNewUrlParser: true
// });
const connection = mongoose.connection;
connection.once("open", () => console.log("DB Connection Success"));

app.get("/", (req, res) => {
  res.json({ "80000": "800000" });
});

const ItemSchema = new mongoose.Schema({
  name: String
});
const Item = mongoose.model("Item", ItemSchema);
app.get("/items", async (req, res) => {
  try {
    const newItem = { name: "New Item" };
    const data = await Item.create(newItem);
    res.json(data);
  } catch (err) {
    res.json({ err: "Error found", msg: err });
  }
});

app.listen(5000, () => console.log("Node is running at port 5000"));
