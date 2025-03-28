function status(request, response) {
  response.status(200).json({
    message:
      "um autoelogio pode ser tão importante para autoestima quanto receber um elogio de outra pessoa",
  });
}

export default status;
