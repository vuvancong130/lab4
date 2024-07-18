//npm i multer
//npm i fs
//npm i path
//npm i express
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
//tao doi tuong express
const app = express();
const upload = multer({ dest: "uploads/" }); //dinh nghia thu muc chua anh upload
//cau hinh duong dan phuc vu file trong thu muc uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//cau hinh link den thu muc views
app.set("views", path.join(__dirname, "views"));
//chon view engine la ejs
app.set("view engine", "ejs");
//route hien thi cac anh trong thu muc
app.get("/gallery", (req, res) => {
  //doc tat ca ca file trong thu muc upload
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      console.error("loi khi doc file: ", err);
      return;
    }
    res.render("gallery", { images: files });
  });
});
//route upload anh
app.post("/upload", upload.single("image"), (req, res) => {
  //upload anh
  res.redirect("/gallery"); //tra ve trang gallery
});
//lang nghe
app.listen(3001, () => {
  console.log("server dang chay o cong 3001");
});
