import jwt from "jsonwebtoken";
import zod from "zod";
import { jwt_secret, node_env } from "@repo/backend-common/config";
import { signupSchema, signinSchema } from "@repo/common/zodtype";
import prismaClient from "@repo/db/client";
import bcrypt from "bcrypt";

export async function signup(req: any, res: any) {
  try {
    const { email, username, password } = req.body;

    signupSchema.parse({ email, username, password });

    const existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Email or username already exists" });
    }

    if (!jwt_secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prismaClient.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: newUser.id }, jwt_secret, {
      expiresIn: "1h",
    });

    res.cookie("jwt-drawapp", token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: node_env === "production",
    });

    res.status(200).json({ message: "Signup successful", token });
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

export async function signin(req: any, res: any) {
  try {
    const { username, password } = req.body;

    signinSchema.parse({ username, password });

    if (!username || !password) {
      return res.status(400).json({ message: "Enter username and password" });
    }

    const user = await prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!jwt_secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ id: user.id }, jwt_secret, {
      expiresIn: "1h",
    });

    res.cookie("jwt-drawapp", token, {
      httpOnly: true,
      secure: node_env === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export function createRoom(req: any, res: any) {}
