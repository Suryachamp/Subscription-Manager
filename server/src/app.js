const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan"); //This is for consoling the request that postman generates when we hit API
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")
const subscriptionRoutes = require("./routes/subscription.routes")

const app = express(); //main control center

//This middleware runs before the route handler
//Middleware like traffic controller what should do what
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json()); //converts incoming json into js objects
app.use(cookieParser()); //Required for jwt authentication
app.use(morgan("dev"));

//Routes through which will navigate throughout the site
app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

module.exports = app;
