const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, email, password, answer } = req.body;
  if (!name || !email || !password || !answer) {
    res.status(400).send("all fields compulsory");
  }
  try {
    const emailcheck = await User.findOne({ email: email });
    if (emailcheck) {
      res.status(400).send("this email already exist");
    } else {
      const newuser = new User({ name, email, password, answer });
      const usersave = await newuser.save();
      res.status(200).send(usersave);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("filled all your field");
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const passwordcheck = await bcrypt.compare(password, user.password);
      if (passwordcheck) {
        const token = await user.generatetoken();
        console.log(token);
        res.status(200).send({ token, user });
      }
    } else {
      res.status(400).send("this user does not exist");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
