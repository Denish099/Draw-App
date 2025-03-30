import jwt from "jsonwebtoken";
import zod from "zod";

const userSchema = zod.object({
  username: zod.string().min(3, "Username must be at least 3 characters long"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include an uppercase letter, lowercase letter, a number, and a special character."
    ),
});

export function signup(req: any, res: any) {
  try {
    const { username, password } = req.body;

    userSchema.parse({ username, password });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Internal server error" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
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

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
    res.status.json({ message: "server error" });
  }
}

export function createRoom(req: any, res: any) {}
