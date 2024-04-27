const express = require("express");
const router = express.Router();
const isAuth = require("../../middlewares/is-auth");
const isAdmin = require("../../middlewares/is-admin");
const validateQueryParams = require("../../middlewares/validate-query-params");
const User = require("../../models/user");

const validSortColumns = ["id", "email", "role"];

// Get all users
router.get(
  "/",
  isAuth,
  isAdmin,
  validateQueryParams(validSortColumns),
  async (req, res, next) => {
    try {
      const result = await User.findAll(req.query);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// Create a new user
router.post("/", isAuth, isAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.status(201).send(user);
  } catch (error) {
    if (error.errors) {
      return res.status(error.status ?? 400).send(error.errors);
    }

    next(error);
  }
});

// Update a user by id
router.put("/:id", isAuth, isAdmin, async (req, res, next) => {
  try {
    const user = await User.update(req.params.id, req.body);

    res.json(user);
  } catch (error) {
    if (error.errors) {
      return res.status(error.status ?? 400).send(error.errors);
    }

    next(error);
  }
});

// Delete a user by id
router.delete("/:id", isAuth, isAdmin, async (req, res, next) => {
  try {
    await User.delete(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get stats
router.get("/stats", isAuth, isAdmin, async (req, res, next) => {
  try {
    const result = await User.getStats();

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
