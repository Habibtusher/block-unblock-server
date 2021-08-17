const mongoose = require("mongoose");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors")
const dotenv = require("dotenv");
const bodyParser = require('body-parser')


dotenv.config();

const port = process.env.PORT || 5050;
const url = "mongodb+srv://habib:habib@cluster0.avdod.mongodb.net/assignment?retryWrites=true&w=majority";



console.log(url);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  // .then(() => console.log("Database connected!"))
  // .catch((err) => console.log(err));

  const authRoute = require("./Route/auth");
  const blockRoute = require("./Route/block")

//middleware

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());



app.use("/auth", authRoute);
app.use("/block",blockRoute)


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log("Listening.....");
});