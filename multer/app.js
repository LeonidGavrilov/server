const express = require("express");
const multer  = require("multer");
  
const app = express();
 
const upload = multer({dest:"uploads"});
app.use(express.static(__dirname));
 
app.post("/upload", upload.single("filedata"), function (req, res, next) {
   
    let filedata = req.file;
 
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.listen(3000);