const db = require("../config/db");

// CREATE
exports.create = async (req, res) => {
  try {
    const { type, dateDebut, dateFin, motif, idEmployee } = req.body;

    await db.execute(
      `INSERT INTO conge (type, dateDebut, dateFin, status, motif, idEmployee)
       VALUES (?, ?, ?, 'en_attente', ?, ?)`,
      [type, dateDebut, dateFin, motif, idEmployee]
    );

    res.json({ message: "Congé demandé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute(`SELECT * FROM conge`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { status } = req.body;

    await db.execute(`UPDATE conge SET status=? WHERE id=?`, [
      status,
      req.params.id,
    ]);

    res.json({ message: "Statut mis à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await db.execute("DELETE FROM conge WHERE id=?", [req.params.id]);
    res.json({ message: "Congé supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
