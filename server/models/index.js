const client = require('../db');

module.exports = {
  getReviews(params, callback) {
    console.log(params);
    const [page, count, sort, product_id] = params;
    const tempparams = [product_id, count]; // Add count as second paramter
    const queryString = 'SELECT id from customer_review WHERE product_id = $1 LIMIT $2';
    const secondList = [];
    client.query(queryString, tempparams, (err, results) => {
      const arr = results.rows.map((key) => parseInt(key.id));
      console.log('This is arr: ', arr);
      let list = arr.map((currentURL) => {
        const currentReviewIDparam = [currentURL];
        console.log('This is currentURL: ', currentURL);
        const queryString2 = `SELECT json_agg(json_build_object('id', c.id, 'rating', c.rating, 'summary', c.summary, 'recommend', c.recommend, 'response', c.response, 'body', c.body, 'date', c.date, 'reviewer_name', c.reviewer_name, 'helpfulness', c.helpfulness, 'photos', (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photo AS p WHERE p.review_id = $1))) FROM customer_review AS c where c.id = $1;`;
        return client.query(queryString2, currentReviewIDparam, (err2, results2) => {
          // console.log('This is results2 LINE 19: ', results2[1]);
          console.log('This is jsonAgg LINE 20 ', results2.rows[0].json_agg);
          secondList.push(results2.rows[0].json_agg);
          console.log('THis is second List;', secondList);
        });
      });
      // callback(err, secondList);
      console.log('This is second list LINE 26', secondList);
      console.log('This is second list LINE 26', list);
      // callback(err2, results2);
    });
  },
  getMeta(params, callback) {
    console.log(params);
    // const queryString = 'SELECT c.id, c.name FROM characteristics AS c INNER JOIN characteristic_reviews AS cr ON c.id = cr.characteristic_id WHERE product_id = $1;';
    // const countrecommend = 'SELECT COUNT(*) FROM customer_review WHERE customer_review.id = $1 AND customer_review.recommend = true';
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

// 'SELECT (id, rating, date, summary, body, recommend,
//  reported, reviewer_name, reviewer_email, response, helpfulness)
//  FROM customer_review WHERE product_id = $1 LIMIT $2';
// getReviews(params, callback) {
//   console.log(params);
//   const [page, count, sort, product_id] = params;
//   const tempparams = [product_id]; // Add count as second paramter
//   // const queryString = 'SELECT id from customer_review WHERE product_id = $1 LIMIT $2';
//   const queryString2 = 'SELECT customer_review.id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness json_agg( json_build_object("id", p.id, "url", p.url)) AS p FROM customer_review LEFT JOIN photo ON customer_review.id = photo.review_id WHERE customer_review.id = $1 GROUP BY customer_review.id';
//   client.query(queryString2, tempparams, (err, results) => {
//     console.log('This is results:', results);
//     callback(err, results);
//   });
// },

// SELECT c.rating, c.date, c.summary, c.body, c.recommend, c.reported, c.reviewer_name, c.reviewer_email, c.response, c.helpfulness, p.id, p.url FROM customer_review c INNER JOIN photo p ON c.id = 1 AND p.review_id = 1

// SELECT json_agg(json_build_object('id', c.id, 'rating', c.rating, 'summary', c.summary, 'recommend', c.recommend, 'response', c.response, 'body', c.body, 'date', c.date, 'reviewer_name', c.reviewer_name, 'helpfulness', c.helpfulness, 'photos', (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photo AS p WHERE p.review_id = 5))) FROM customer_review AS c where c.id = 6;