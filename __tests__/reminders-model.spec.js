const request = require("supertest"); // calling it "request" is a common practice
const supertest = require("supertest");
const bcrypt = require("bcryptjs");
const server = require("../server");
const remindersModel = require("../reminders/reminders-model");
const usersModel = require("../users/users-model");
const db = require("../data/dbConfig");

beforeEach(async () => {
  await db("reminders").truncate();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("reminders-model.js", () => {
  it("create function", async () => {
    let reminderData = {
      message: "exam next monday",
      send_date: "2016-03-07",
      time: "08:00:00",
      user_id: 2,
    };
    let reminder;
    reminder = await remindersModel.addReminder(reminderData);

    expect(reminder).toEqual(reminder);
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
    let data = {
      id: 1,
      message: "exam next monday",
      send_date: "2016-03-07",
      time: "08:00:00",
      user_id: 2,
    };
    //const res = await supertest(server).get("/api/reminders");
    const res = remindersModel.getReminders();
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
    let reminderData = {
      message: "exam next monday",
      send_date: "2016-03-07",
      time: "08:00:00",
      user_id: 2,
    };
    //await db("reminders").where({ id }).insert(reminderData);
    /*   await db("reminders")
    .where({ id })
    .update({ message: "Bring your dictionary!" }); */

    let id = 1;
    remindersModel.addReminder(reminderData);
    remindersModel.updateReminder({ message: "Bring your dictionary!" }, id);

    let reminder = remindersModel.getRemindersById(id);
    /*  await db("reminders").where({ id }).first().select("message");*/
    expect(reminder.message).toEqual({ message: "Bring your dictionary!" });
  });
  it("delete function", async () => {
    // status(204).del()
    let reminderData = {
      id: 1,
      message: "exam next monday",
      send_date: "2016-03-07",
      time: "08:00:00",
      user_id: 2,
    };

    const login = {
      username: "Jake",
      password: "abc123",
    };

    const credentials = login;
    const hash = bcrypt.hashSync(credentials.password, 14);

    credentials.password = hash;

    await supertest(server).post("/api/auth/login").send(login);

    // find the user in the database by its username then
    let user = usersModel.findByUsername(login.username);
    /*     db("users").where({ username: login.username }).first(); */
    if (!user || !bcrypt.compareSync(credentials.password, login.password)) {
      return console.log("Incorrect credentials");
    }

    remindersModel.addReminder(reminderData);
    //await db("reminders").insert(data);
    let id = 1;
    let reminders;
    reminders = remindersModel.getReminders();
    //reminders = await db("reminders");
    expect(reminders).toHaveLength(1);
    await db("reminders").where({ id }).first().del();
    reminders = await db("reminders");
    expect(reminders).toHaveLength(0);
    reminders = await db("reminders").where({ id }).first();

    expect(reminders).toEqual(undefined);
  });
});
