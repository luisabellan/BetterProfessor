// no functions used here
/*
- when making a GET request to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ message: "Welcome to our API" }`.
*/
const request = require('supertest'); // calling it "request" is a common practice

const server = require('../api/server'); //
const db = require("../data/dbConfig");

beforeEach(async () => {
    await db('users').truncate();
    await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});
describe('index.js', () => {
    // http calls made with supertest return promises, we can use async/await if desired
   

        it('should return a JSON object from the index route', async () => {
            const expectedBody = { message: "Welcome to our API!" };

            const response = await request(server).get('/');

            expect(response.body).toEqual(expectedBody);
        });
 
})
        