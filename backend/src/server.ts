import { app } from "./app";
import { db } from "./prisma/db";

const PORT = 3000;

async function startServer() {
  try {
    await db.connect();

    console.log("PostgreSQL conectado com sucesso");

    app.listen(PORT, () => {
      console.log(
        `O servidor de teste está rodando na porta ${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Erro ao conectar ao PostgreSQL:",
      error
    );

    process.exit(1);
  }
}

startServer();