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

export default userSchema;
