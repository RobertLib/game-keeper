const express = require("express");
const router = express.Router();
const isAuth = require("../../middlewares/is-auth");
const isAdmin = require("../../middlewares/is-admin");
const validateQueryParams = require("../../middlewares/validate-query-params");
const Game = require("../../models/game");

const validSortColumns = ["id", "name"];

// Get all games
router.get(
  "/",
  isAuth,
  isAdmin,
  validateQueryParams(validSortColumns),
  async (req, res, next) => {
    try {
      const result = await Game.findAll(req.query);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// Get a game by id
router.get("/:id", isAuth, isAdmin, async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);

    res.json(game);
  } catch (error) {
    next(error);
  }
});

// Create a new game
router.post(
  "/",
  isAuth,
  isAdmin,
  /** @param {import("express").Request} req */ async (req, res, next) => {
    try {
      const game = await Game.create({ ...req.body, ownerId: req.user?.id });

      res.status(201).json(game);
    } catch (error) {
      next(error);
    }
  }
);

// Update a game by id
router.put("/:id", isAuth, isAdmin, async (req, res, next) => {
  try {
    const game = await Game.update(req.params.id, req.body);

    res.json(game);
  } catch (error) {
    next(error);
  }
});

// Delete a game by id
router.delete("/:id", isAuth, isAdmin, async (req, res, next) => {
  try {
    await Game.delete(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
