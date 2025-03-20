import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const register = async (req, res) => {
  try {
    const { clientName, email, password, phone, address, city, country, zip } =
      req.body;

    if (
      !clientName ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !city ||
      !country ||
      !zip ||
      !req.file
    ) {
      return res.status(400).json({
        message: "All fields are required, including the profile image.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Access uploaded image path
    const UserImage = req.file.path;

    // Construct full image URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const UserImg = `${baseUrl}/images/${path.basename(UserImage)}`;

    // Create new user
    const newUser = new User({
      clientName,
      email,
      picturePath: UserImg,
      password: passwordHash,
      phone,
      address,
      city,
      country,
      zip,
    });

    // Save user to database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
