/*
- when making a GET request to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ message: "Welcome to our API" }`.
*/
const request = require("supertest"); // calling it "request" is a common practice

const server = require("../api/server");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("users").truncate();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("user-model.js", () => {
  it("create function", async () => {
    let data = {
      id: 1,
      username: "Paul",
      password: "abc123",
      name: "Paul Smith",
      email_address: "paul@gmail.com",
      role: "admin",
    };

    await db("users").insert(data);

    let user;
    user = await db("users").where({ id: 1 }).first();
    expect(user).toEqual({
      id: 1,
      username: "Paul",
      password: "abc123",
      name: "Paul Smith",
      email_address: "paul@gmail.com",
      role: "admin",
    });
  });

  it("update function", async () => {
    let data = {
      id: 1,
      username: "Paul",
      password: "abc123",
      name: "Paul Smith",
      email_address: "paul@gmail.com",
      role: "admin",

     
    };
    let id = 1;

    await db("users").where({ id }).insert(data);
    await db("users").where({ id }).update({ username: "Paco" });
    let user = await db("users").where({ id }).first().select("username");
    expect(user).toEqual({ username: "Paco" });
  });
  it("delete function", async () => {
    // status(204).del()
    let data = {
      id: 1,
      username: "Paul",
      password: "abc123",
      name: "Paul Smith",
      email_address: "paul@gmail.com",
      role: "admin",
    };

    await db("users").insert(data);
    let id = "1";
    let users;
    users = await db("users");
    expect(users).toHaveLength(1);
    await db("users").where({ id }).first().del();
    users = await db("users");
    expect(users).toHaveLength(0);
    let user;
    user = await db("users").where({ id }).first();

    expect(user).toEqual(undefined);
  });
});
