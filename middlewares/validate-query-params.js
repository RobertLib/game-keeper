/**
 * @param {(string | qs.ParsedQs | string[] | qs.ParsedQs[])[]} validSortColumns
 * @param {string} [defaultSortKey]
 * @param {string} [defaultSortOrder]
 * @param {number} [defaultLimit]
 * @param {number} [defaultOffset]
 */
const validateQueryParams = (
  validSortColumns,
  defaultSortKey = "id",
  defaultSortOrder = "desc",
  defaultLimit = 20,
  defaultOffset = 0
) => {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @param {import("express").NextFunction} next
   */
  return (req, res, next) => {
    const sortKey = req.query.sortKey || defaultSortKey;
    const sortOrder = req.query.sortOrder || defaultSortOrder;
    const limit = req.query.limit || defaultLimit;
    const offset = req.query.offset || defaultOffset;

    if (!validSortColumns.includes(sortKey)) {
      return res.status(400).send("Invalid sort column.");
    }

    const parsedLimit = parseInt(String(limit), 10);
    const parsedOffset = parseInt(String(offset), 10);

    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).send("Invalid query parameters.");
    }

    if (isNaN(parsedOffset) || parsedOffset < 0) {
      return res.status(400).send("Invalid query parameters.");
    }

    req.query.sortKey = sortKey;
    req.query.sortOrder = sortOrder === "asc" ? "asc" : "desc";
    req.query.limit = String(parsedLimit);
    req.query.offset = String(parsedOffset);

    next();
  };
};

module.exports = validateQueryParams;
