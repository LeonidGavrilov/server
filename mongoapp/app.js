const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;

const app = express();
const jsonParser = express.json();
const password = "V8d-VCL-HgG-Vua";
const url =
  "mongodb+srv://LeonidG:" + password + "@cluster0.r4e4w.mongodb.net/";
const mongoClient = new MongoClient(url);

app.use(express.static(__dirname + "/public"));

(async () => {
  try {
    await mongoClient.connect();
    app.locals.collection = mongoClient.db("usersdb").collection("users");
    await app.listen(3000);
    console.log("Сервер ожидает подключения...");
  } catch (err) {
    return console.log(err);
  }
})();

app.get("/api/users", async (req, res) => {
  const collection = req.app.locals.collection;
  try {
    const users = await collection.find({}).toArray();
    res.send(users);
  } catch (err) {
    return console.log(err);
  }
});
app.get("/api/users/:id", async (req, res) => {
  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  try {
    const user = await collection.findOne({ _id: id });
    res.send(user);
  } catch (err) {
    return console.log(err);
  }
});

app.post("/api/users", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  let user = { name: userName, age: userAge };

  const collection = req.app.locals.collection;

  try {
    await collection.insertOne(user);
    res.send(user);
  } catch (err) {
    return console.log(err);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const id = new objectId(req.params.id);
  const collection = req.app.locals.collection;
  try {
    const result = await collection.findOneAndDelete({ _id: id });
    const user = result.value;
    res.send(user);
  } catch (err) {
    return console.log(err);
  }
});

app.put("/api/users", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  const id = new objectId(req.body.id);
  const userName = req.body.name;
  const userAge = req.body.age;

  const collection = req.app.locals.collection;
  try {
    const result = await collection.findOneAndUpdate(
      { _id: id },
      { $set: { age: userAge, name: userName } },
      { returnDocument: "after" }
    );
    const user = result.value;
    res.send(user);
  } catch (err) {
    return console.log(err);
  }
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async () => {
  await mongoClient.close();
  console.log("Приложение завершило работу");
  process.exit();
});

// let users = [{name: "Bob", age: 34} , {name: "Alice", age: 21}, {name: "Tom", age: 23}];
// async function run() {
//     try {
//         await mongoClient.connect();
//         const db = mongoClient.db("usersdb");
//         const collection = db.collection("users");
//         // await collection.insertMany(users);
//         const result = await collection.updateMany({name: "Bob"}, { $set: {name: "Sasha"}});
//         console.log(result);
//         const results = await collection.find().toArray();
//         console.log(results);
//         const count = await collection.countDocuments();
//         console.log(`В коллекции users ${count} документов`);
//     }catch(err) {
//         console.log("Ошибка", err);
//     } finally {
//         await mongoClient.close();
//     }
// }
// run();

// mongoClient.connect(function (err, client) {
//   const db = client.db("usersdb");
//   const collection = db.collection("users");
//   let user = { name: "Tom", age: 23 };

//   collection.insertOne(user, function (err, result) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(result);
//     console.log(user);
//   });

//   collection.countDocuments(function (err, result) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log(`В коллекции users ${result} документов`);
//     client.close();
//   });

// });
