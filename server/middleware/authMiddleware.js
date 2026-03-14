import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "secret-key";

export const authMiddleware = (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      return res.status(401).json({ message: "No token" });
   }

   try {
      const token = authHeader.startsWith("Bearer ")
         ? authHeader.slice(7)
         : authHeader;
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      next();
   } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
   }
};
