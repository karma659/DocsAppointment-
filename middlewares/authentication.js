const jwt = require("jsonwebtoken");

// Middleware for verifying JWT token and checking user role
const verifyToken = async (req, res, next) => {
   try {
      // Get the JWT token from the request header
      const token = req.headers.authorization.split(" ")[1];
      // console.log("token", token);
      // Verify the token using the secret key
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
      // console.log(" decodedToken ", decodedToken);
      // Attach the user object or user ID and role to the request object for future use
      req.userId = decodedToken.userId;
      req.userRole = decodedToken.role;
      console.log("ID role", req.userId, req.userRole);

      next();
   } catch (error) {
      return res.status(401).json({message: "Unauthorized"});
   }
};

// Middleware for role-based authorization
function authorizeRoles(allowedRoles) {
   return (req, res, next) => {
      try {
         console.log("allowedRoles , req.userRole ", allowedRoles, req.userRole);
         // Check if the user's role is included in the allowed roles
         if (allowedRoles.includes(req.userRole)) {
            next(); // User is authorized, continue to the next middleware or route handler
         } else {
            res.status(403).json({message: "Forbidden"}); // User does not have the required role
         }
      } catch (error) {
         res.status(401).json({message: "Unauthorized"}); // Token is missing or invalid
      }
   };
}

module.exports = {
   verifyToken,
   authorizeRoles
};
