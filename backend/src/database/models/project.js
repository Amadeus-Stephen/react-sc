const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  owner: { type: Object, unique: false, required: true },
  name: { type: String, unique: true, required: true },
  tasks: { type: Array, unique: false, required: true },
  completed: { type: Boolean, unique: false, default: false },
});

module.exports = mongoose.model("Project", projectSchema);
