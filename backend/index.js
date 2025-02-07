const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const authoRouter = require('./src/users/user.route')





 //middleware setups
app.use(express.json({ limit: "25mb" }))
// app.use((express.urlencoded({ limit: "25mb" })))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})
)


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authoRouter);

main().then(()=>console.log('mongodb is connected')).catch((err) => console.log(err));
console.log();
//ethioLebaba
//admin

async function main() {
  await mongoose.connect(process.env.DB_URL);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    app.get("/", (req, res) => {
      res.send("ethio lebaba ecommerce!");
    });

}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



