const express = require("express");
const request = require("supertest");
const db = require("./db");

// Set the JWT_SECRET environment variable for testing
process.env.JWT_SECRET = "testsecret";

// Mock bcrypt and jsonwebtoken
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

// Mock middlewares
jest.mock("./middlewares/is-auth", () => (req, res, next) => {
  req.user = { id: 1, role: "ADMIN" }; // Mock authenticated user
  next();
});

// Mock database
jest.mock("./db");

/** @param {any[]} data @param {number} [count] */
const mockDbQuery = (data, count) => {
  /** @type {jest.Mock} */ (db.query).mockResolvedValueOnce({ rows: data });
  if (count !== undefined) {
    /** @type {jest.Mock} */ (db.query).mockResolvedValueOnce({
      rows: [{ count: count.toString() }],
    });
  }
};

/**
 * @param {string} basePath
 * @param {express.Router} router
 */
function createApp(basePath, router) {
  const app = express();
  app.use(express.json());
  app.use(basePath, router);

  return app;
}

// Reset all mocks before each test
beforeEach(() => {
  jest.resetAllMocks();
});

module.exports = {
  createApp,
  db,
  mockDbQuery,
  request,
};
