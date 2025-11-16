const db = require("../config/db");

// CREATE
exports.create = async (req, res) => {
  try {
    const { titre, contenu, image } = req.body;

    await db.execute(
      `INSERT INTO actualite (titre, contenu, publier, cree_le, poster_le, image, nbCommentaire, nbLike)
       VALUES (?, ?, 1, NOW(), NOW(), ?, 0, 0)`,
      [titre, contenu, image]
    );

    res.json({ message: "Actualité publiée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM actualite ORDER BY poster_le DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { titre, contenu } = req.body;

    await db.execute(
      `UPDATE actualite SET titre=?, contenu=? WHERE id=?`,
      [titre, contenu, req.params.id]
    );

    res.json({ message: "Actualité modifiée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    await db.execute("DELETE FROM actualite WHERE id=?", [req.params.id]);
    res.json({ message: "Actualité supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
