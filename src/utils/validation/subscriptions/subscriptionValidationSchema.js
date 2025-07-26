import joi from "joi";
export const addSubscriptionValidationSchema = {
  body: joi
    .object()
    .keys({
      title: joi.string().min(3).max(60),
      price: joi.number().min(0),
      currency: joi.string().valid("USD", "EUR", "GBP", "INR"),
      category: joi.string(),
      frequency: joi.string().valid("daily", "monthly", "weekly", "yearly"),
    })
    .required()
    .options({ abortEarly: false }),
};
