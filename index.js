// code away!
const server = require("./server");

const port = process.env.PORT || 8000;

server.listen(port, () =>
  console.log(`Server listening for connection at localhost:8000`)
);
