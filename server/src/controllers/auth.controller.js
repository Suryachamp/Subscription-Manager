const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { registerSchema } = require("../validations/subscription.validation");
const { loginSchema } = require("../validations/subscription.validation");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        errors: validationResult.error.flatten().fieldErrors,
      });
    }

    const { email, password } = validationResult.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid usersname or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET_KEY,
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


// When the page refreshes redux loses the memory this function reads the cookie that the browser saved and returns the users info
exports.me = async (req,res) => {
  try {
    // req.user.userId is injected my authmiddleware after it reads the cookie
    // we use it to loop up the full user from the database.
    const user = await prisma.user.findUnique({
      where: {id: req.user.userId},
      select: {id:true, name:true, email:true},
    });
    if(!user){
      return res.status(404).json({message:"user not found"});
    }

    return res.status(200).json({user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:"Internal server error"
    });
  };
};



  // POST /auth/logout — Destroys the session
  // Why: Simply calling clearCookie removes the JWT from the browser.
  // Without the cookie, authMiddleware will reject all future requests.

exports.logout = async (req,res) => {
  // The cookie options (httpOnly, sameSite) must match what you used in login to correctly identify and delete the right cookie
  res.clearCookie("token",{
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.status(200).json({
    message:"Logged out successfully"
  });
}
