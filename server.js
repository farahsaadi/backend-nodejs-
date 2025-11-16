const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Importation des routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/employee", require("./routes/employeeRoutes"));
app.use("/stagiaire", require("./routes/stagiaireRoutes"));
app.use("/conge", require("./routes/congeRoutes"));
app.use("/materiel", require("./routes/materielRoutes"));
app.use("/actualite", require("./routes/actualiteRoutes"));
app.use("/reunion", require("./routes/reunionRoutes"));
app.use("/invitation", require("./routes/invitationRoutes"));


app.listen(3000, () => {
  console.log("✅ Serveur démarré sur http://localhost:3000");
});
