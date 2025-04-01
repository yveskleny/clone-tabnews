import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({
    message:
      "um autoelogio pode ser tão importante para autoestima quanto receber um elogio de outra pessoa",
  });
}

export default status;
