const supertest = require("supertest");
const server = require("../server");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

beforeAll(async () => {
  await db("projects_users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("projects_users integration tests", () => {
  //CREATE PROJECTS_USERS
  it("POST /api/projects-users", async () => {
    const data = {
      project_id: 1,
      user_id: 2,
    };
    const login = {
      username: "Jake",
      password: "abc123",
    };
    const credentials = login;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    // find the user in the database by its username then
    let user = db("users").where({ username: login.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, login.password)) {
      return console.log("Incorrect credentials");
    }

    // the user is valid, continue on
    const res = await supertest(server).post("/api/projects_users").send(data);
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body).toEqual({
      project_id: 1,
      user_id: 2,
    });
  });

  // // LOGIN USER
  // it("POST /api/auth/login", async () => {
  //   const data = {
  //
  //     username: "Jake",
  //     password: "abc123",
  //   };
  //
  //   const credentials = data;
  //   const hash = bcrypt.hashSync(credentials.password, 14);
  //
  //   credentials.password = hash;
  //
  //   const res = await supertest(server).post("/api/auth/login").send(data);
  //
  //
  //   // find the user in the database by its username then
  //   let user = db("users").where({ username: data.username }).first();
  //   if (!user || !bcrypt.compareSync(credentials.password, data.password)) {
  //     return console.log("Incorrect credentials");
  //   }
  //
  //   // the user is valid, continue on
  //   expect(res.statusCode).toBe(200);
  //   expect(res.type).toBe("application/json");
  //
  // });

  // UPDATE PROJECTS_USERS
  it("UPDATE /api/projects_users/:id", async () => {
    const data = {
      user_id: 2,
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

    const result = await supertest(server)
      .put(`/api/projects_users/${id}`)
      .send(data);
    expect(result.type).toBe("application/json");
    expect(status).toBe(201);
  });

  it("GET /api/projects_users", async () => {
    let data = {
      project_id: 1,
      user_id: 2,
    };

    await db("projects_users");

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

    const res = await supertest(server).get("/api/projects_users");
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body[0].project_id).toBe(1);
    expect(res.body[0].user_id).toBe(2);
    expect(res.body).toHaveLength(1);
  });

  it("GET /api/projects_users/:project_id", async () => {
    let data = {
      project_id: 1,
      user_id: 2,
    };

    await db("projects_users").where({ project_id: 2 }).first();

    let project_id = 2;
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

    result = await supertest(server).get(`/api/projects_users/${id}`);

    expect(result.body).toEqual({
      project_id: 1,
      user_id: 2,
    });
  });

  it("GET /api/projects_users/:project_id (not found)", async () => {
    let project_id = 5000;
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
    res = await supertest(server).get(`/api/projects_users/${id}`);
    expect(res.status).toEqual(expectedStatusCode);
    expect(res.username).toBe(undefined);
    expect(res.type).toBe("application/json");
  });
});
