import jwt from "jsonwebtoken";
import zod from "zod";
import jwtsecret from "@repo/backend-common/config";
import userSchema from "@repo/common/zodtype";

export function signup(req: any, res: any) {
  try {
    const { username, password } = req.body;

    userSchema.parse({ username, password });

    if (!jwtsecret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ username }, jwtsecret, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Signup successful", token });
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export function signin(req: any, res: any) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json("enter username or password");
    }

    // db check

    if (!jwtsecret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ username }, jwtsecret, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
    res.status.json({ message: "server error" });
  }
}

export function createRoom(req: any, res: any) {}
