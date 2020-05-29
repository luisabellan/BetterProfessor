const supertest = require("supertest");
const server = require("../index");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("users integration tests", () => {
  //CREATE USER
  it("POST /api/auth/register", async () => {
    const data = {
      id: 1,
      username: "Jake",
      password: "abc123",
      name: "Jake Smith",
      email_address: "jake@gmail.com",
      role: "mentor",
    };

    const credentials = data;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    const res = await supertest(server).post("/api/auth/register").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");

    // find the user in the database by its username then
    let user = db("users").where({ username: data.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, data.password)) {
      return console.log("Incorrect credentials");
    }

    // the user is valid, continue on

    expect(res.body).toEqual({
      id: 1,
      username: "Jake",
      password: "abc123",
      name: "Jake Smith",
      email_address: "jake@gmail.com",
      role: "mentor",
    });
  });


  //LOGIN USER
  it("POST /api/auth/login", async () => {
    const data = {
   
      username: "Jake",
      password: "abc123",

    };

    const credentials = data;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    const res = await supertest(server).post("/api/auth/login").send(data);
   

    // find the user in the database by its username then
    let user = db("users").where({ username: data.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, data.password)) {
      return console.log("Incorrect credentials");
    }

    // the user is valid, continue on
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");

  });



  // UPDATE USER
  it("UPDATE /api/users/:id", async () => {
    const data = {
      username: "Viktor",
    };
    let id = 1;
    const result = await supertest(server).put(`/api/users/${id}`).send(data);
    expect(result.type).toBe("application/json");
    expect(statusCode).toBe(201);
  });

  it("GET /api/users", async () => {
/*     let data = {
     id: 1,
      username: "Jake",
      password: "abc123",
      name: "Jake Smith",
      email_address: "jake@gmail.com",
      role: "mentor",
    };

    await db("users").insert(data); */
    const res = await supertest(server).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body[0].username).toBe("Jake");
    expect(res.body[0].role).toBe("student");
    expect(res.body).toHaveLength(1);
  });

  it("GET /api/users/:id", async () => {
    let data = {
      id: 1,
      username: "Paul",
      password: "abc123",
      name: "Paul Smith",
      email_address: "paul@gmail.com",
      role: "mentor",
    };

    await db("users").insert(data);

    let id = 1;
    let result;
    result = await supertest(server).get(`/api/users/${id}`);

    expect(result.body).toEqual({
      id: 1,
      username: "Paul",
      password: "abc123",
      name: "Paul Smith",
      email_address: "paul@gmail.com",
      role: "mentor",
    });
  });

  it("GET /api/users/:id (not found)", async () => {
    let id = 5000;
    const expectedStatusCode = 404;
    let res;
    res = await supertest(server).get(`/api/users/${id}`);
    expect(res.status).toEqual(expectedStatusCode);
    expect(res.username).toBe(undefined);
    expect(res.type).toBe("application/json");
  });
});
