import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [2, "Title must be at least 2 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      uppercase: true,
      default: "USD",
      required: [true, "Currency is required"],
      enum: {
        values: ["INR", "USD", "EUR", "GBP"],
        message: "{VALUE} is not supported",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      lowercase: true,
      enum: {
        values: [
          "sports",
          "entertainment",
          "news",
          "technology",
          "science",
          "health",
          "education",
          "finance",
          "politics",
          "travel",
          "lifestyle",
          "fashion",
          "gaming",
          "food",
          "music",
          "art",
          "business",
          "culture",
          "history",
          "automotive",
          "other",
        ],
        message: "{VALUE} is not supported",
      },
    },
    startDate: {
      type: Date,
      default: new Date(),
      validate: {
        validator: function (val) {
          return val < new Date();
        },
        message: "Start date must be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (val) {
          return val > new Date();
        },
        message: "Renewal date must be in the future",
      },
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      lowercase: true,
      enum: {
        values: ["daily", "weekly", "monthly", "yearly"],
        message: "{VALUE} is not supported",
      },
    },
    status: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: ["active", "expired", "cancelled"],
        message: "{VALUE} is not supported",
      },
      default: "active",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User Id is required"],
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
  }
);
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    this.renewalDate = new Date(this.startDate);

    const frequencyValues = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const daysToAdd = frequencyValues[this.frequency];

    if (daysToAdd) {
      this.renewalDate.setDate(this.renewalDate.getDate() + daysToAdd);
    }
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
