console.log("Starting Renovision backend...");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Renovision backend is running!" });
});

// Generate renovation plan
app.post("/api/renovation-plan", (req, res) => {
  const { room, length, width, description } = req.body || {};

  // Validate the input
  if (
    typeof room !== "string" ||
    !room.trim() ||
    typeof description !== "string" ||
    !description.trim() ||
    !Number.isFinite(Number(length)) ||
    !Number.isFinite(Number(width)) ||
    Number(length) <= 0 ||
    Number(width) <= 0
  ) {
    return res.status(400).json({
      error: "Please provide a room, positive dimensions, and a description."
    });
  }

  const text = description.toLowerCase();

  const categories = [];
  const steps = [];
  const materials = [];
  const professionals = [];

  // Helper function to add steps
  function addStep(title) {
    steps.push({
      id: steps.length + 1,
      title: title
    });
  }

  // Rule 1: Painting
  if (
    /paint|painting|repaint|wall color|wall colour/.test(text)
  ) {
    categories.push("Painting");

    addStep("Prepare and clean the walls");
    addStep("Repair cracks and apply primer");
    addStep("Paint the walls");

    materials.push("Wall paint", "Primer", "Paint rollers", "Brushes");
    professionals.push("Painter");
  }

  // Rule 2: Lighting
  if (
    /light|lighting|lamp|bulb|chandelier/.test(text)
  ) {
    categories.push("Lighting");

    addStep("Plan lighting positions");
    addStep("Check the electrical connections");
    addStep("Install the new lights");

    materials.push("LED lights", "Light fixtures", "Electrical fittings");
    professionals.push("Electrician");
  }

  // Rule 3: Plumbing
  if (
    /plumb|pipe|faucet|tap|sink|toilet|leak/.test(text)
  ) {
    categories.push("Plumbing");

    addStep("Inspect the plumbing system");
    addStep("Repair or replace the required parts");
    addStep("Test the water connections");

    materials.push("Pipes", "Pipe fittings", "Sealant");
    professionals.push("Plumber");
  }

  // No matching renovation category
  if (categories.length === 0) {
    categories.push("General Renovation");

    addStep("Inspect the room");
    addStep("Review the requested changes");
    addStep("Prepare a renovation plan");
  }

  // Send the renovation plan
  res.json({
    room: room.trim(),
    categories,
    steps,
    materials: [...new Set(materials)],
    professionals: [...new Set(professionals)]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Renovision backend running on http://localhost:${PORT}`);
});
