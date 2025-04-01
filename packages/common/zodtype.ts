import zod from "zod";

const signupSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "this feild need to be filled" })
    .email("this is not a valid email"),
  username: zod.string().min(3, "Username must be at least 3 characters long"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include an uppercase letter, lowercase letter, a number, and a special character."
    ),
});

const signinSchema = zod.object({
  username: zod.string().min(3, "Username must be at least 3 characters long"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include an uppercase letter, lowercase letter, a number, and a special character."
    ),
});

export { signupSchema, signinSchema };
