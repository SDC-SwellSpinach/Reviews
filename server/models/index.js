const client = require('../db');

module.exports = {
  getReviews(params, callback) {
    console.log(params);
    const [page, count, sort, product_id] = params;
    const tempparams = [product_id];
    const queryString = `SELECT json_agg(json_build_object('id', c.id, 'rating', c.rating, 'summary', c.summary, 'recommend', c.recommend, 'response', c.response, 'body', c.body, 'date', c.date, 'reviewer_name', c.reviewer_name, 'helpfulness', c.helpfulness, 'photos', (SELECT json_agg(json_build_object('url', p.url)) FROM photo AS p WHERE p.review_id = c.id))) FROM customer_review AS c INNER JOIN photo AS ph ON ph.review_id = c.id WHERE c.product_id = $1;`;
    client.query(queryString, tempparams, (err, results) => {
      callback(err, results.rows[0].json_agg);
    });
  },
  getMeta(params, callback) {
    const queryStr = `SELECT json_agg(json_build_object('product_id', 100, 'ratings', (SELECT COUNT(*) FROM customer_review WHERE customer_review.product_id = $1 AND customer_review.recommend = true) , 'characteristics', (SELECT json_agg(json_build_object('id', c.id, 'name', c.name)) FROM characteristics AS c INNER JOIN characteristic_reviews AS cr ON c.id = cr.characteristic_id WHERE product_id = $1)));`;
    client.query(queryStr, params, (err, results) => {
      console.log('THis is Line 38: ', results.rows[0].json_agg);
      console.log(err, results);
      callback(err, results.rows[0].json_agg);
    });
  },
  postReview(params, callback) {
    const paramsReview = params.splice(0, 11);
    const [photourl, characteristics] = params;
    console.log('This is photourl', photourl);
    const queryStringReview = 'INSERT INTO customer_review ( product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id';
    client.query(queryStringReview, paramsReview, (err, results) => {
      JSON.parse(photourl).map((currentURL) => {
        const photoparams = [parseInt(results.rows[0].id), currentURL];
        const queryStringPhoto = 'INSERT INTO photo (review_id , url) VALUES ($1, $2)';
        return client.query(queryStringPhoto, photoparams, (err2, results2) => {
          callback(err2, results2);
        });
      });
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
