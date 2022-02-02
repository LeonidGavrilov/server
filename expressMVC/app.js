const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");
 
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));
 
app.use("/users", userRouter);;
app.use("/", homeRouter);
 
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

const password = "V8d-VCL-HgG-Vua";
const dbName = "usersdb";
const url =
  "mongodb+srv://LeonidG:" + password + "@cluster0.r4e4w.mongodb.net/" + dbName;
// подключение
mongoose.connect(url, {
  useUnifiedTopology: true,
}, function(err){
  if(err) return console.log(err);
  app.listen(3000, function(){
      console.log("Сервер ожидает подключения...");
  });
});


// mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true }, function(err){
//     if(err) return console.log(err);
//     app.listen(3000, function(){
//         console.log("Сервер ожидает подключения...");
//     });
// });