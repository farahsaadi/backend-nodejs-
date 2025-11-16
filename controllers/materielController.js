const db = require("../config/db");

// CREATE
exports.create = async (req, res) => {
  try {
    const { libelle, description, codeInventaire, disponibilite, quantiteDispo } = req.body;

    await db.execute(
      `INSERT INTO materiel (libelle, description, codeInventaire, disponibilite, quantiteDispo)
       VALUES (?, ?, ?, ?, ?)`,
      [libelle, description, codeInventaire, disponibilite, quantiteDispo]
    );

    res.json({ message: "Matériel ajouté" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM materiel");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { quantiteDispo } = req.body;

    await db.execute(
      `UPDATE materiel SET quantiteDispo=? WHERE id=?`,
      [quantiteDispo, req.params.id]
    );

    res.json({ message: "Matériel mis à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await db.execute(`DELETE FROM materiel WHERE id=?`, [req.params.id]);
    res.json({ message: "Matériel supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
