import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "secret-key";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Khong tim thay token" });
  }

  try {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = { ...decoded };
    if (!req.user.id && req.user.user_id) {
      req.user.id = req.user.user_id;
    }

    if (!req.user.id) {
      return res.status(401).json({
        message: "Token khong chua user id hop le",
      });
    }

    next();
  } catch (err) {
    console.error("DEBUG: Loi xac thuc JWT:", err.message);
    return res.status(403).json({
      message: "Token khong hop le hoac da het han",
      error: err.message,
    });
  }
};
