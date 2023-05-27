const models = require('../models');

module.exports = {
  getReviews: (req, res) => {
    const { page, count, sort, product_id } = req.query;
    const params = [page, count, sort, product_id];
    models.getReviews(params, (err, results) => {
      if (err) {
        // console.log(err);
        res.end();
      } else {
        // console.log(results);
        res.sendStatus(201);
        res.json(results);
        res.end();
      }
    });
  },
  postReview: (req, res) => {
    const date = Date.now();
    const reported = false;
    const helpfulness = 0;
    const response = null;
    const {
      product_id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics } = req.query;
    const params = [product_id,
      rating, date,
      summary, body,
      recommend,
      reported,
      name,
      email,
      response,
      helpfulness,
      photos,
      characteristics,
    ];
    models.postReview(params, (err, results) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        console.log(results);
        res.sendStatus(204);
      }
    });
  },
  putHelpful: (req, res) => {
    console.log(req.params.review_id);
    const params = [req.params.review_id];
    console.log(params);
    models.Helpful(params, (err, results) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        console.log(results);
        res.sendStatus(204);
      }
    });
  },
  putReport: (req, res) => {
    console.log(req.params.review_id);
    const params = [req.params.review_id];
    console.log(params);
    models.Report(params, (err, results) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        console.log(results);
        res.sendStatus(204);
      }
    });
  },
};
// getReviewsMeta: (req, res) => {

// },

// postReviews: (req, res) => {

// },
