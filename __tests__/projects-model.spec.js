const request = require("supertest"); // calling it "request" is a common practice
const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const server = require("../server");
const projectsModel = require("../projects/projects-model");
const usersModel = require("../users/users-model");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("projects").truncate();
  //await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("projects-model.js", () => {
  it("create function", async () => {
    const login = {
      username: "Jake",
      password: "abc123",
    };

    const credentials = login;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    await supertest(server).get("/api/auth/login").send(login);

    // find the user in the database by its username then
    let user = db("users").where({ username: login.username }).first();
    if (!user || !bcrypt.compareSync(credentials.password, login.password)) {
      return console.log("Incorrect credentials");
    }

    let projectData = {
      name: "Apples and Bananas",
      due_date: "2020-07-17",
    };

    //await db("projects").insert(data);
    await projectsModel.create(projectData);
    let project;
    let id = 1;
    // project = await db("projects").where({ id: 1 }).first();
    project = await projectsModel.findById(id);
    expect(project).toEqual({
      id: 1,
      name: "Apples and Bananas",
      due_date: "2020-07-17",
    });
  });

  // Read function
  it("read function", async () => {
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

    //const res = await supertest(server).get("/api/reminders");
    const res = projectsModel.getProjects();
    console.log(res);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body[0].message).toBe("exam next monday");
    expect(res.body[0].send_date).toBe("2016-03-07");
    expect(res.body[0].time).toBe("08:00:00");
    expect(res.body[0].user_id).toBe(2);
    expect(res.body).toHaveLength(1);
  });

  it("update function", async () => {
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
    let data = {
      id: 1,
      name: "Apples and Pears",
      due_date: "2020-07-17",
    };
    let id = 1;

    await db("projects").where({ id }).insert(data);
    await db("projects").where({ id }).update({ name: "Paco" });
    let project = await db("projects").where({ id }).first().select("name");
    expect(project).toEqual({ name: "Paco" });
  });

  it("delete function", async () => {
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

    let projectData = {
      name: "Apples and Pears",
      due_date: "2020-07-17",
    };

    projectsModel.create(projectData);
    // await db("projects").insert(data);

    let id = 1;

    await projectsModel.remove(id);
  });
});
