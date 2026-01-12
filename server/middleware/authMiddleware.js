// auth middleware
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  // Here you would normally verify the token and extract user info
  try {
    // Dummy verification for illustration
    if (token === "valid-token") {
      req.user = { id: 1, name: "John Doe" }; // Example user
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
