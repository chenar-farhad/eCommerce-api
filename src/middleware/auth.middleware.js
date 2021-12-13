import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
export function isAuth(req, res, next) {
  // Get the token from the Authorization header
  const token = req.headers.authorization;
  console.log(token);
  try {
    // Check the token to verify if it is valid
    jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    // If the token is not valid, return an error in the response
    return res.status(401).json({ error: "You don't have permission!" });
  }
  next();
}

// Middleware to check if the user is admin
export function isAdmin(req, res, next) {
  // Get the token from the Authorization header
  const token = req.headers.authorization;
  try {
    // Check the token to verify if it is valid
    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    // check if the user is admin then allow the request to access the protected route
    if (user.role === "admin") {
      req.user = user;
      return next();
    }
    // If the user is not admin, return an error in the response
    return res.status(401).json({ error: "You don't have permission!" });
  } catch (error) {
    // If the token is not valid, return an error in the response
    return res.status(401).json({ error: "You don't have permission!" });
  }
}
