// step 1 import express
const express = require("express");
const app = express();
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// const authRouter = require("./routes/auth");
// const categoryRouter = require("./routes/category");

// เพิ่มขนาด payload ที่อนุญาต (เช่น 10MB)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// เส้นทางและ middleware อื่นๆ ของคุณ...

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// app.use('/api', authRouter);
// app.use('/api', categoryRouter);

// step 3 router
// app.post("/api", (req, res) => {
//     const { username, password } = req.body;
//     console.log(username, password);
//     res.send("Hello World");
// });
readdirSync("./routes")
.map((c)=> app.use("/api", require('./routes/'+c))  );


// step 2 start server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});

