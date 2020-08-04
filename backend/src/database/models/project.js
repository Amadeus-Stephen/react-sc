const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  owner: { type: Object, unique: false, required: true },
  name: { type: String, unique: true, required: true },
  tasks: { type: Array, unique: false, required: true },
  completed: { type: Boolean, unique: false, default: false },// basically just here for the future 
})                                                           // 90% sure i didnt add the "completed"
                                                              // feature
                                                           // everything else is pretty standard

module.exports = mongoose.model("Project", projectSchema);
