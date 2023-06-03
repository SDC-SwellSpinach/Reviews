const { createClient } = require('redis');
const models = require('../models');

const redisClient = createClient();
redisClient.on('error', (err) => console.log('This is an error from redis: ', err));
redisClient.connect();

module.exports = {
  getReviews: (req, res) => {
    // console.log('THis is query', req.query);
    const { page, count, sort, product_id } = req.query;
    const params = [page, count, sort, product_id];
    // console.log('This is product ID: ', product_id);
    redisClient.get(`productID-${product_id}`)
      .then((CachedResult) => {
        // console.log(CachedResult);
        if (CachedResult) {
          res.json(JSON.parse(CachedResult));
        } else {
          return models.getReviews(params, (err, results) => {
            if (err) {
              console.log(err);
              res.end();
            } else {
              // console.log('WOrking');
              // console.log('Line 13 controller/getreviews Check error:  2', results);
              const data = {
                product_id,
                count,
                page,
                results: [...results],
              };
              res.json(data);
              return redisClient.set(`productID-${product_id}`, JSON.stringify(data))
                .then(() => console.log('Redis cached product success'));
            }
          });
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




// getReviews: (req, res) => {
//   const { page, count, sort, productID } = req.query;
//   const params = [page, count, sort, productID];
//   redisClient.get(`productID-${productID}`)
//     .then((CachedResult) => {
//       if (CachedResult) {
//         res.json(JSON.parse(CachedResult));
//       } else {
//         return models.getReviews(params, (err, results) => {
//           if (err) {
//             console.log(err);
//             res.end();
//           } else {
//             console.log('WOrking');
//             // console.log('Line 13 controller/getreviews Check error:  2');
//             const data = {
//               productID,
//               count,
//               page,
//               results: [...results],
//             };
//             res.json(data);
//             return redisClient.set(`productID-${productID}`, JSON.stringify(data)).then(() => console.log('Redis cached product success'));
//           }
//         });
//       }
//     });
  // models.getReviews(params, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     res.end();
  //   } else {
  //     console.log('WOrking');
  //     // console.log('Line 13 controller/getreviews Check error:  2');
  //     const data = {
  //       productID,
  //       count,
  //       page,
  //       results: [...results],
  //     };
  //     res.json(data);
  //     res.end();
  //   }
  // });
// },