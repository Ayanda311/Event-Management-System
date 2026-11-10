
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
    }

    // 2. Validate name
    if (typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters",
      });
    }

    // 3. Validate email
    if (typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    // 4. Validate password
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    // 5. Check whether email already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7. Create new user
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    // 8. Return response without password
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    console.error("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // 2. Validate email type
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Find user by email
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    // 4. Check whether user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5. Compare entered password with stored hash
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    // 6. Check password
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 7. Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// Export controller functions
module.exports = {
  registerUser,
  loginUser,
};
