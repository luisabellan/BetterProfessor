require('dotenv').config()
const server = require('./index.js');

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
