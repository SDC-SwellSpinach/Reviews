const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017`);

const reviewsSchema = new mongoose.Schema(
  {
    product: { type: Number, required: true },
    page: Number,
    count: Number,
    results: [
      {
        review_id: Number,
        rating: Number,
        summary: String,
        recommend: Boolean,
        response: { type: String, default: null },
        body: String,
        date: { type: Number, default: (new Date()).getTime() },
        reviewer_name: String,
        helpfulness: Number,
        photos: [
          {
            id: Number,
            url: String
          }
        ]
      }
    ],
  },
);
const metaDataSchema = new mongoose.Schema(
  {
    product_id: { type: Number, required: true },
    ratings: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number
    },
    recommended: Boolean,
    characteristics: {
      Size: {
        id: Number,
        value: Number
      },
      Width: {
        id: Number,
        value: Number
      },
      Comfort: {
        id: Number,
        value: Number
      },
      Quality: {
        id: Number,
        value: Number
      },
      Length: {
        id: Number,
        value: Number
      },
      Fit: {
        id: Number,
        value: Number
      }
    },
  },
  { timestamps: true }
);

const Review = new mongoose.model('Review', reviewsSchema);
const Meta = new mongoose.model('Meta', metaDataSchema);

module.exports = {
  Review: Review,
  Meta: Meta
}