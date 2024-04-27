require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const logger = require("./middlewares/logger");
const auth = require("./routes/auth");
const games = require("./routes/games");
const adminGames = require("./routes/admin/games");
const adminUsers = require("./routes/admin/users");

app.use(compression());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client", "dist")));

if (app.get("env") === "production") {
  app.use(helmet());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  app.use(limiter);
}

app.use("/api/auth", auth);
app.use("/api/games", games);
app.use("/api/admin/games", adminGames);
app.use("/api/admin/users", adminUsers);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
