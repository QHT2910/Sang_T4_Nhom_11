import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "secret-key";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Không tìm thấy token" });
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
        message: "Token không chứa user id hợp lệ",
      });
    }

    next();
  } catch (err) {
    console.error("DEBUG: Lỗi xác thực JWT:", err.message);
    return res.status(403).json({
      message: "Token không hợp lệ hoặc đã hết hạn",
      error: err.message,
    });
  }
};

export const requireRoles = (...allowedRoles) => {
  const normalizedRoles = allowedRoles.flat().filter(Boolean);

  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({ message: "Ban khong co quyen truy cap" });
    }

    if (!normalizedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Ban khong duoc phep thuc hien thao tac nay" });
    }

    next();
  };
};
