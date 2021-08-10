const express = require("express");
const fs = require("fs");
const app = express();
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  console.log(__dirname);
  res.send("hello");
});

// app.post("/test", upload.single("kiun"), (req, res) => {
//   console.log("fieldname", req.file.fieldname); // form에 정의된 이름
//   console.log("originalname", req.file.originalname); //사용자가 업로드한 파일명
//   console.log("destination", req.file.destination); // 파일이 저장된 폴더
//   console.log("path", req.file.path); // 파일이 저장된 폴더
//   res.send("dkdk");
// });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // server.js를 기준으로의 path라서, uploads/이렇게 하는건가
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

app.post("/test/multer", (req, res) => {
  console.log(10);
  upload(req, res, function (err) {
    if (err) {
      // 업로드할때 오류가 발생함
      console.log("error come");
      return res.send({ success: false, err });
    }
    console.log("no error");
    return res.send({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

app.get("/img", (req, res) => {
  const p = req.query.path;
  console.log(p);
  try {
    fs.readFile(`${__dirname}/${p}`, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.end(data);
      }
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000`);
});
