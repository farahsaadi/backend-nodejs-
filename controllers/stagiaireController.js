const db = require("../config/db");

// CREATE
exports.create = async (req, res) => {
  try {
    const { institut, dateDebut, dateFin, idUtilisateur, sujetStage, typeStage, departement } = req.body;

    await db.execute(
      `INSERT INTO stagaire (institut, dateDebut, dateFin, idUtilisateur, sujetStage, typeStage, departement)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [institut, dateDebut, dateFin, idUtilisateur, sujetStage, typeStage, departement]
    );

    res.json({ message: "Stagiaire ajouté" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT s.*, u.nom, u.prenom
      FROM stagaire s
      JOIN utilisateur u ON u.id = s.idUtilisateur
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { sujetStage, departement } = req.body;

    await db.execute(
      `UPDATE stagaire SET sujetStage=?, departement=? WHERE idUtilisateur=?`,
      [sujetStage, departement, req.params.idUtilisateur]
    );

    res.json({ message: "Stagiaire modifié" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await db.execute(`DELETE FROM stagaire WHERE idUtilisateur=?`, [req.params.idUtilisateur]);
    res.json({ message: "Stagiaire supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
