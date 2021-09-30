const server = require("./api/app.js");

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
