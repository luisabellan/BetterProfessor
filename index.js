require('dotenv').config()
const server = require('./api/server.js');

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
