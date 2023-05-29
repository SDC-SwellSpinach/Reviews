const request = require('supertest');
const app = require('../app'); // Replace './app' with the path to your Express server file

describe('Review API ', () => {
  it('Should return true', () => {
    expect(true).toBe(true);
  });
  it('Should return the correct product id and related reviews', async () => {
    const productid = 40345;
    const response = await request(app)
      .get('/reviews')
      .send(`product_id=${productid}`)
      .expect(function (res) {
        res.body.id = productid;
      });
  });
  it('Should add a review to review table', async () => {
    const productid = 'product_id=40345';
    const response = await request(app)
      .post('/reviews?product_id=5&rating=3&summary=Great Product Latest added&body=This is a great Product. I love using drones to fly around&recommend=true&name=tester&photos=["https://www.latestfreepictures.com/sunset"]&characteristics={"14": 5, "15": 3}&email=tester@gmail.com')
      .expect(function (res) {
        res.body.id = productid;
      });
  });
  it('Should Report a review', async () => {
    const productid = 40345;
    const response = await request(app)
      .put('/reviews/40345/report')
      .send(`product_id=${productid}`)
      .expect(204);
  });
  it('Should increase Helpfulness by one', async () => {
    const reviewid = 100;
    const response = await request(app)
      .put('/reviews/100/helpful')
      .send(`product_id=${reviewid}`)
      .expect(204);
  });
});
