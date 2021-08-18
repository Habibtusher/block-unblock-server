const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/Users");

//Register User
router.post("/register", async (req, res) => {
  console.log(req.body.email);

  const isNewUser = await User.isThisEmailUse(req.body.email);

  if (!isNewUser) {
    const singleUser = await User.findOne({ email: req.body.email })
    res.status(200).json(singleUser);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    name: req.body.name,
  });
  const user = await User(newUser)
  await user.save()
  res.status(200).json(user);


})

//Login
router.post("/login", async (req, res) => {

  try {

    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("No user found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Invalid password");

    res.status(200).json(user);
    // res.send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/add-block/:email", async (req, res) => {
  console.log(req.body.bEmail);
  console.log("server received", req.params.email);
  User.updateOne(
    { email: req.params.email },
    { $push: { blockList: { email: req.body.bEmail, given: true, taken: false } } })
    .then(result => {
      if (result.modifiedCount > 0) {
        res.send(true);
      }
    })
  User.updateOne(
    { email: req.body.bEmail },
    { $push: { blockList: { email: req.params.email, given: false, taken: true } } })
    .then(result => {
      if (result.modifiedCount > 0) {
        res.send(true);
      }
    })

})

router.get("/allUser/:email", async (req, res) => {

  console.log("server get 1", req.params);
  User.find({ email: req.params.email })
    .then(res =>  res[0].blockList)
    .then(data => {
      const qEmail = data.map(element => element.email);
      User.find({ email: { $exists: true, $nin: [...qEmail,req.params.email] } })
      .then(result => {
        res.send(result)
      })
    })
  
});


router.get("/all-block/:email", async (req, res) => {
  console.log("search block", req.params.email);
  try {
    User.find({ email: req.params.email })
      .then((result) => {
       const blockValue= result[0].blockList.filter(ele => ele.given=true)
       console.log(blockValue);
        res.send(result)
      })
  } catch (err) {
    console.log(error)
    res.status(500).json(err);
  }
});

module.exports = router;