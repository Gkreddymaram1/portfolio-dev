const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Skill", SkillSchema);
