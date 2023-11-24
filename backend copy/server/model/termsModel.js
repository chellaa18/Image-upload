const mongoose = require("mongoose");

const yourDataSchema = new mongoose.Schema(
  {
    termsData: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return typeof value === "string";
        },
        message: "termsData must be a string",
      },
    },
  },
  {
    collection: "admin",
  }
);

yourDataSchema.pre("save", async function (next) {
  const existingDocumentCount = await this.model("YourData").countDocuments();

  if (existingDocumentCount > 0) {
    const error = new Error("Terms condition document is already there!");
    return next(error);
  }

  next();
});

const YourDataModel = mongoose.model("YourData", yourDataSchema);

module.exports = YourDataModel;
