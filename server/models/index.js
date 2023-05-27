const client = require('../db');

module.exports = {
  getReviews(params, callback) {
    console.log(params);
    const [page, count, sort, product_id] = params;
    const tempparams = [product_id]; // Add count as second paramter
    // const queryString = 'SELECT id from customer_review WHERE product_id = $1 LIMIT $2';
    const queryString2 = 'SELECT customer_review.id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness json_agg( json_build_object("id", p.id, "url", p.url)) AS p FROM customer_review LEFT JOIN photo ON customer_review.id = photo.review_id WHERE customer_review.id = $1 GROUP BY customer_review.id';
    client.query(queryString2, tempparams, (err, results) => {
      console.log('This is results:', results);
      callback(err, results);
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

// 'SELECT (id, rating, date, summary, body, recommend,
//  reported, reviewer_name, reviewer_email, response, helpfulness)
//  FROM customer_review WHERE product_id = $1 LIMIT $2';