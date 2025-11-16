const db = require("../config/db");

// CREATE
exports.create = async (req, res) => {
  try {
    const { titre, emailRecepteur, idReunion } = req.body;

    await db.execute(
      `INSERT INTO invitation (titre, emailRecepteur, idReunion, dateEnvoie)
       VALUES (?, ?, ?, NOW())`,
      [titre, emailRecepteur, idReunion]
    );

    res.json({ message: "Invitation envoyée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT i.*, r.titre AS reunion
      FROM invitation i
      JOIN reunion r ON r.id = i.idReunion
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await db.execute("DELETE FROM invitation WHERE id=?", [req.params.id]);
    res.json({ message: "Invitation supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
