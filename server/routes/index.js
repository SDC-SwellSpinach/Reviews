const router = require('express').Router();
const controllers = require('../controllers');

router.get('/reviews/', controllers.getReviews);
router.get('/reviews/meta', controllers.getMeta);
router.put('/reviews/:review_id/report', controllers.putReport);
router.put('/reviews/:review_id/helpful', controllers.putHelpful);
router.post('/reviews', controllers.postReview);

module.exports = router;
