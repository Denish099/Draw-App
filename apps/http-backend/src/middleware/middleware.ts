import jwt from "jsonwebtoken";
import { jwt_secret } from "@repo/backend-common/config";
import prismaClient from "@repo/db/client";

export async function authMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.cookies["jwt-drawapp"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" }); // Sending response
    }

    if (!jwt_secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const decoded = jwt.verify(token, jwt_secret) as { id: string };
    req.user = decoded;

    const user = await prismaClient.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" }); // Sending response
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
