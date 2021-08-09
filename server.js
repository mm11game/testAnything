const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.post("/test", upload.single("kiun"), (req, res) => {
  console.log("fieldname", req.file.fieldname); // form에 정의된 이름
  console.log("originalname", req.file.originalname); //사용자가 업로드한 파일명
  console.log("destination", req.file.destination); // 파일이 저장된 폴더
  console.log("path", req.file.path); // 파일이 저장된 폴더
  res.send("dkdk");
});

app.listen(4000, () => {
  console.log(`Example app listening at http://localhost:4000`);
});
