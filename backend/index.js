const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
