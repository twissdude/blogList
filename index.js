const app = require('./app'); // The actual Express application
const http = require('http');
const config = require('./Utils/config'); // Assuming you have a config file for environment variables

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
