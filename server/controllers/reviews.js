const models = require('../models');

module.exports = {
  getReviews: (req, res) => {
    const { page, count, sort, product_id } = req.query;
    const params = [page, count, sort, product_id];
    models.getReviews(params, (err, results) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        const data = {
          product_id,
          count,
          page,
          results: [...results],
        };
        res.json(data);
        res.end();
      }
    });
  },
  postReview: (req, res) => {
    // console.log('This is req.body', req.body);
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
      characteristics } = req.body;
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
        res.sendStatus(204);
      }
    });
  },
  getMeta: (req, res) => {
    const params = [parseInt(req.query.product_id)];
    models.getMeta(params, (err, results) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        // console.log(results);
        let data = {
          ...results['0'],
        };
        data.product_id = req.query.product_id;
        // console.log('This is data:', data);
        res.json(data);
        res.end();
      }
    });
  },
  putHelpful: (req, res) => {
    const params = [req.params.review_id];
    models.Helpful(params, (err, results) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.sendStatus(204);
      }
    });
  },
  putReport: (req, res) => {
    const params = [req.params.review_id];
    models.Report(params, (err, results) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.sendStatus(204);
      }
    });
  },
};
