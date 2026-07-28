require("dotenv").config();
const http = require("http");
const app = require("./app");
const startCronJobs = require("./jobs/cron");
const { initSocket } = require("./config/socket");

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

initSocket(server); // Turn on the WebSockets
startCronJobs();

// Make sure it says `server.listen` and NOT `app.listen`
server.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
