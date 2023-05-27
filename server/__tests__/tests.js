const app = require('../index');

let server;

beforeAll(() => {
  server = app.listen(3000); // start the server
});

afterAll((done) => {
  server.close(done); // stop the server
});
