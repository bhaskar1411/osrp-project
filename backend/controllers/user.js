const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser =  (req, res, next) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'esarkar991@gmail.com',
      pass: 'bhaskar@14'
    }
  });

  const mailOptions = {
    from: 'esarkar991@gmail.com',
    to: req.body.email,
    subject: 'Online Stock Register Portal',
    text: 'Welcome to the Online Stock Register Portal. The username: '+ req.body.email + ' password: '+req.body.password+'.'
  };
  transporter.sendMail(mailOptions);

  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      uname: req.body.uname,
      email: req.body.email,
      password: hash,
      role: req.body.role
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id},
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        role: fetchedUser.role,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
}
