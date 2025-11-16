const db = require("../config/db");

// CREATE
exports.create = async (req, res) => {
  try {
    const { titre, dateDebut, duree, lieu } = req.body;

    await db.execute(
      `INSERT INTO reunion (titre, dateDebut, duree, lieu)
       VALUES (?, ?, ?, ?)`,
      [titre, dateDebut, duree, lieu]
    );

    res.json({ message: "Réunion créée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM reunion");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { titre, dateDebut, duree, lieu } = req.body;

    await db.execute(
      `UPDATE reunion SET titre=?, dateDebut=?, duree=?, lieu=? WHERE id=?`,
      [titre, dateDebut, duree, lieu, req.params.id]
    );

    res.json({ message: "Réunion mise à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await db.execute("DELETE FROM reunion WHERE id=?", [req.params.id]);
    res.json({ message: "Réunion supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
