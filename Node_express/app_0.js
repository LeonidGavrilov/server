const express = require("express");
const fs = require("fs");

const app = express();
app.use(function (request, response, next) {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let data = `${hour}:${minutes}:${seconds} ${request.method} ${
    request.url
  } ${request.get("user-agent")}`;
//   console.log(data);
  fs.appendFile("server.log", data + "\n", function () {});
  next();
});
// app.use(function (request, response) {
//   response.sendFile(__dirname + "/index.html");
// });
app.use("/home/foo/bar",function (request, response) {
    response.status(404).send(`Ресурс не найден`);
  });
app.use(function (request, response) {
  response.send();
  // response.send("<h2>Hello</h2>");
  // response.send({id:6, name: "Tom"});
  // response.send(["Tom", "Bob", "Sam"]);
  // response.send(Buffer.from("Hello Express"));
  // console.log(response.send(Buffer.from("Hello Express")));
});

app.get("/", function (request, response) {
  response.send("Hello");
});
app.listen(3000, console.log("Start server"));
// import express from "express";
// const express = require("express");
// import greeting from "greeting";
// создаем приложение
// const app = express();
// app.get("/", (request, response) => response.send("Hello from Express!"));
// app.get("/blyat", (request, response) => response.send("Hello from Express blyat!"));
// app.listen(5000);
///////////////////////////////////////////////////
// const getHome = (request, response) => {
//     response.end("Hello from Express!");
// }
// получаем модули
