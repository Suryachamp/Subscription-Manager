//This starts the application

require("dotenv").config();

const app = require("./app");
const startCronJobs = require("./jobs/cron");

const PORT = process.env.PORT || 5000;

// Start the background cron jobs for notifications
startCronJobs();

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})