import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const authControllers = {
  register: async (req, res) => {
    try {
      const {
        clientName,
        email,
        password,
        phone,
        address,
        city,
        country,
        zip,
      } = req.body;

      //    const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        clientName,
        email,
        password: passwordHash,
        phone,
        address,
        city,
        country,
        zip,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      console.log(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. " });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;

      res.status(200).json({ token, user });
    } catch (err) {
      console.log(err.message);
    }
  },
};
