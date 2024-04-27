const db = require("../db");
const AppError = require("../utils/app-error");

const gameProperties = [
  "name",
  "genre",
  "releaseDate",
  "developer",
  "publisher",
  "platform",
  "rating",
  "note",
  "ownerId",
];

class Game {
  /**
   * @param {import("@types").Game} data
   */
  constructor({
    id,
    createdAt,
    updatedAt,
    deletedAt,
    name,
    genre,
    releaseDate,
    developer,
    publisher,
    platform,
    rating,
    note,
    ownerId,
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.name = name;
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.developer = developer;
    this.publisher = publisher;
    this.platform = platform;
    this.rating = rating;
    this.note = note;
    this.ownerId = ownerId;
  }

  static async findAll({
    sortKey = "id",
    sortOrder = "desc",
    limit = 20,
    offset = 0,
    deleted = "false",
    name = "",
  } = {}) {
    try {
      let whereQuery = `WHERE "deletedAt" IS ${
        deleted === "true" ? "NOT" : ""
      } NULL`;

      const values = [];

      if (name) {
        whereQuery += ` AND unaccent("name") ILIKE unaccent($1)`;
        values.push(`%${name}%`);
      }

      const gamesQuery = `
        SELECT * FROM "games"
        ${whereQuery}
        ORDER BY "${sortKey}" ${sortOrder}
        LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

      const countQuery = `SELECT COUNT(*) FROM "games" ${whereQuery}`;

      const gamesResult = await db.query(gamesQuery, [
        ...values,
        limit,
        offset,
      ]);

      const countResult = await db.query(countQuery, values);

      const games = gamesResult.rows.map((game) => new Game(game));
      const total = parseInt(countResult.rows[0].count, 10);

      return { data: games, total };
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  /** @param {string} id */
  static async findById(id) {
    try {
      const { rows } = await db.query('SELECT * FROM "games" WHERE "id" = $1', [
        id,
      ]);

      if (rows.length === 0) {
        throw new AppError("Game not found.", 404);
      }

      return new Game(rows[0]);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  /** @param {object} data */
  static async create(data) {
    try {
      const gameData = {};

      gameProperties.forEach((prop) => {
        if (data[prop] !== undefined) {
          gameData[prop] = data[prop];
        }
      });

      if (!gameData.name || !gameData.genre) {
        throw new AppError("Name and genre are required.", 400);
      }

      const fields = Object.keys(gameData);
      const quotedFields = fields.map((field) => `"${field}"`).join(", ");
      const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");
      const values = fields.map((key) => gameData[key]);

      const query = `
        INSERT INTO "games" (${quotedFields})
        VALUES (${placeholders})
        RETURNING *`;

      const { rows } = await db.query(query, values);

      return new Game(rows[0]);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  /** @param {string} id, @param {object} data */
  static async update(id, data) {
    try {
      const gameData = {};

      gameProperties.forEach((prop) => {
        if (data[prop] !== undefined) {
          gameData[prop] = data[prop];
        }
      });

      if (!gameData.name || !gameData.genre) {
        throw new AppError("Name and genre are required.", 400);
      }

      gameData.updatedAt = new Date();

      const fields = Object.keys(gameData);
      const setClause = fields
        .map((field, index) => `"${field}" = $${index + 1}`)
        .join(", ");

      const values = fields.map((key) => gameData[key]);
      values.push(id);

      const query = `
        UPDATE "games"
        SET ${setClause}
        WHERE "id" = $${values.length}
        RETURNING *`;

      const { rows } = await db.query(query, values);

      if (rows.length === 0) {
        throw new AppError("Game not found.", 404);
      }

      return new Game(rows[0]);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }

  /** @param {string} id */
  static async delete(id) {
    try {
      const { rows } = await db.query(
        'UPDATE "games" SET "deletedAt" = NOW() WHERE "id" = $1 RETURNING *',
        [id]
      );

      if (rows.length === 0) {
        throw new AppError("Game not found.", 404);
      }

      return new Game(rows[0]);
    } catch (error) {
      throw new AppError(error.message, error.status);
    }
  }
}

module.exports = Game;
