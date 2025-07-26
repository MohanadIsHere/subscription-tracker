import joi from "joi";

export const signinValidationSchema = {
  body: joi
    .object()
    .keys({
      email: joi.string().email(),
      password: joi
        .string()

        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .min(6)
        .max(100),
    })
    .required()
    .options({
      abortEarly: false,
    }),
};
