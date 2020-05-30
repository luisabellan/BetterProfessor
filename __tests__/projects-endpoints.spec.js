const supertest = require("supertest");
const server = require("../index");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await db("projects").truncate();
});

afterAll(async () => {
  await db.destroy();
});



describe("projects integration tests", () => {
  // //CREATE USER
  // it("POST /api/auth/register", async () => {
  //   const data = {
  //     id: 1,
  //     username: "Peter",
  //     password: "abc123",
  //     name: "Peter Smith",
  //     email_address: "peter@gmail.com",
  //     role: "mentor",
  //   };
  //
  //   const credentials = data;
  //   const hash = bcrypt.hashSync(credentials.password, 14);
  //
  //   credentials.password = hash;
  //
  //   const res = await supertest(server).post("/api/auth/register").send(data);
  //   expect(res.statusCode).toBe(201);
  //   expect(res.type).toBe("application/json");
  //
  //   // find the user in the database by its username then
  //   let user = db("users").where({ username: data.username }).first();
  //   if (!user || !bcrypt.compareSync(credentials.password, data.password)) {
  //     return console.log("Incorrect credentials");
  //   }
  //
  //   // the user is valid, continue on
  //
  //   expect(res.body).toEqual({
  //     id: 1,
  //     username: "Jake",
  //     password: "abc123",
  //     name: "Jake Smith",
  //     email_address: "jake@gmail.com",
  //     role: "mentor",
  //   });
  // });
  //

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



  // UPDATE PROJECT
  it("UPDATE /api/projects/:id", async () => {

    const data = {
      name: "Dinosaurs",
    };
    let id = 1;
    const login = {

      username: "Jake",
      password: "abc123",

    };

    const credentials = login;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    const res = await supertest(server).post("/api/auth/login").send(login);


    // find the user in the database by its username then
    let user = db("users").where({ username: login.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, login.password)) {
      return console.log("Incorrect credentials");
    }

    const result = await supertest(server).put(`/api/projects/${id}`).send(data);
    expect(result.type).toBe("application/json");
    expect(status).toBe(201);
  });

  it("GET /api/projects", async () => {
/*     let data = {
     id: 1,
      username: "Jake",
      password: "abc123",
      name: "Jake Smith",
      email_address: "jake@gmail.com",
      role: "mentor",
    };

    await db("projects").insert(data); */

    const login = {

      username: "Jake",
      password: "abc123",

    };

    const credentials = login;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

     await supertest(server).post("/api/auth/login").send(login);


    // find the user in the database by its username then
    let user = db("users").where({ username: login.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, login.password)) {
      return console.log("Incorrect credentials");
    }

    const res = await supertest(server).get("/api/projects");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body[0].username).toBe("Jake");
    expect(res.body[0].role).toBe("student");
    expect(res.body).toHaveLength(1);
  });

  it("GET /api/projects/:id", async () => {
    let data = {
    "id": 2,
    "name": "Apples and Pears",
    "due_date": "2020-07-17"
    };

    await db("projects").insert(data);

    let id = 2;
    let result;

    const login = {

      username: "Jake",
      password: "abc123",

    };

    const credentials = login;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    await supertest(server).post("/api/auth/login").send(login);


    // find the user in the database by its username then
    let user = db("users").where({ username: login.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, login.password)) {
      return console.log("Incorrect credentials");
    }

    result = await supertest(server).get(`/api/projects/${id}`);

    expect(result.body).toEqual({
      "id": 2,
      "name": "Apples and Pears",
      "due_date": "2020-07-17"
    });
  });

  it("GET /api/projects/:id (not found)", async () => {
    let id = 5000;
    const expectedStatusCode = 404;
    let res;
    const login = {

      username: "Jake",
      password: "abc123",

    };

    const credentials = login;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    await supertest(server).post("/api/auth/login").send(login);


    // find the user in the database by its username then
    let user = db("users").where({ username: login.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, login.password)) {
      return console.log("Incorrect credentials");
    }
    res = await supertest(server).get(`/api/users/${id}`);
    expect(res.status).toEqual(expectedStatusCode);
    expect(res.username).toBe(undefined);
    expect(res.type).toBe("application/json");
  });
});
