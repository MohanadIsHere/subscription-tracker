import Subscription from "../../database/models/subscription.model.js";
export const createSubscription = async (req, res, next) => {
  try {
    const { title, price, currency, category, frequency } = req.body || {};

    const subscription = await Subscription.create({
      title,
      price,
      currency,
      category,
      frequency,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Subscription created successfully",
      success: true,
      data: {
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
