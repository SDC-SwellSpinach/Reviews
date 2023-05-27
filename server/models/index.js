const client = require('../db');

module.exports = {
  getReviews(params, callback) {
    console.log(params);
    const queryString = 'SELECT * FROM customer_review WHERE id = $1 LIMIT $2';
    client.query(queryString, params, (err, results) => {
      callback(err, results);
    });
  },
  Report(params, callback) {
    const queryString = 'UPDATE customer_review SET reported = TRUE WHERE id = $1';
    client.query(queryString, params, (err, results) => {
      callback(err, results);
    });
  },
  Helpful(params, callback) {
    const queryString = 'UPDATE customer_review SET helpfulness = helpfulness + 1 WHERE id = $1';
    client.query(queryString, params, (err, results) => {
      callback(err, results);
    });
  },
};
