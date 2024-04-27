/**
 * @typedef User
 * @property {number} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} [deletedAt]
 * @property {string} email
 * @property {string} password
 * @property {"USER" | "ADMIN"} role
 */

export const User = {};

/**
 * @typedef Game
 * @property {number} id
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} [deletedAt]
 * @property {string} name
 * @property {string} genre
 * @property {Date} [releaseDate]
 * @property {string} [developer]
 * @property {string} [publisher]
 * @property {string} [platform]
 * @property {number} [rating]
 * @property {string} [note]
 * @property {number} ownerId
 */

export const Game = {};
