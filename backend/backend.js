const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Skill = require("./models/Skill");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// 🔗 MongoDB connection 
mongoose.connect("mongodb://127.0.0.1:27017/portfolio")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ➕ CREATE — Add Skill
app.post("/add-skill", async (req, res) => {
  const { skillName, experience } = req.body;

  try {
    const newSkill = new Skill({ skillName, experience });
    await newSkill.save();

    res.json({ message: "Skill added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// 📌 READ — Get All Skills
app.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});


// ✏️ UPDATE — Update a Skill by ID
app.put("/update-skill/:id", async (req, res) => {
  const { id } = req.params;
  const { skillName, experience } = req.body;

  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { skillName, experience },
      { new: true }   // updated data return chestundi
    );

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill updated successfully!", updatedSkill });
  } catch (error) {
    res.status(500).json({ error: "Failed to update skill" });
  }
});


// ❌ DELETE — Delete a Skill by ID
app.delete("/delete-skill/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill" });
  }
});


// 🚀 Start Server
app.listen(3000, () => {
  console.log("Server running on PORT 3000");
});
