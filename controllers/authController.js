const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, motdepasse, role } = req.body;

    const hashed = await bcrypt.hash(motdepasse, 10);

    await db.execute(
      `INSERT INTO utilisateur (nom, prenom, email, motdepasse, actif, role, dateCreation)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [nom, prenom, email, hashed, 1, role]
    );

    res.json({ message: "Compte créé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, motdepasse } = req.body;

    const [rows] = await db.execute("SELECT * FROM utilisateur WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    res.json({ message: "Connexion réussie", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM utilisateur");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.delete = async (req, res) => {
  try {
    await db.execute("DELETE FROM utilisateur WHERE id = ?", [req.params.id]);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
