/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).send("Not authorized.");
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).send("Forbidden: Admins only.");
  }

  next();
}

module.exports = isAdmin;
