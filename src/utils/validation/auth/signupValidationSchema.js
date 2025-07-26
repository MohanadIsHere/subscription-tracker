import joi from "joi";

export const signupValidationSchema = {
  body: joi
    .object()
    .keys({
      name: joi.string().required().min(3).max(60),
      email: joi.string().email().required(),
      password: joi
        .string()
        .required()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .min(6)
        .max(100),
      confirmPassword: joi.string().required().valid(joi.ref("password")),
      role : joi
        .string()
        .valid("user", "admin")
        .default("user")
        .lowercase()
        .trim(),
    })
    .required()
    .options({
      abortEarly: false,
    }),
};
