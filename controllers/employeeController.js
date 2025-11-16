const db = require("../config/db");

// CREATE
exports.create = async (req, res) => {
  try {
    const { matricule, dateEmbauche, etreEmbauche, departement, idUtilisateur, idPoste } = req.body;

    await db.execute(
      `INSERT INTO employee (matricule, dateEmbauche, etreEmbauche, departement, idUtilisateur, idPoste)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [matricule, dateEmbauche, etreEmbauche, departement, idUtilisateur, idPoste]
    );

    res.json({ message: "Employé créé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT e.*, u.nom, u.prenom, p.libelle AS poste
      FROM employee e
      JOIN utilisateur u ON u.id = e.idUtilisateur
      JOIN poste p ON p.id = e.idPoste
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { departement, idPoste } = req.body;

    await db.execute(
      `UPDATE employee SET departement=?, idPoste=? WHERE matricule=?`,
      [departement, idPoste, req.params.matricule]
    );

    res.json({ message: "Employé modifié" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await db.execute(`DELETE FROM employee WHERE matricule=?`, [req.params.matricule]);
    res.json({ message: "Employé supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
