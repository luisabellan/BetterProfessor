const supertest = require("supertest");
const server = require("../index");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await db("reminders").truncate();
});

afterAll(async () => {
  await db.destroy();
});



describe("reminders integration tests", () => {
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

  // LOGIN USER
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



  // UPDATE REMINDER
  it("UPDATE /api/reminders/:id", async () => {

    const data = {
      message: "Finish the exercise",
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

    const result = await supertest(server).put(`/api/reminders/${id}`).send(data);
    expect(result.type).toBe("application/json");
    expect(status).toBe(201);
  });

  it("GET /api/reminders", async () => {
     let data = {
       "id": 1,
      "message": "exam next monday",
      "send_date": "2016-03-07",
      "time": "08:00:00",
      "user_id": 2
    };

    await db("reminders").insert(data);

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

    const res = await supertest(server).get("/api/reminders");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body[0].message).toBe("exam next monday");
    expect(res.body[0].send_date).toBe("2016-03-07");
    expect(res.body[0].user_id).toBe(2);
    expect(res.body).toHaveLength(1);
  });

  it("GET /api/reminders/:id", async () => {
    let data = {
      "id": 2,
      "message": "bring your dictionary",
      "send_date": "2016-03-07",
      "time": "08:00:00",
      "user_id": 1
    };

    await db("reminders").where({id:2}).first();

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

    result = await supertest(server).get(`/api/reminders/${id}`);

    expect(result.body).toEqual({
      "id": 2,
      "message": "bring your dictionary",
      "send_date": "2016-03-07",
      "time": "08:00:00",
      "user_id": 1
    });
  });

  it("GET /api/reminders/:id (not found)", async () => {
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
    res = await supertest(server).get(`/api/reminders/${id}`);
    expect(res.status).toEqual(expectedStatusCode);
    expect(res.username).toBe(undefined);
    expect(res.type).toBe("application/json");
  });
});
