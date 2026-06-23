const prisma = require("../config/prisma");

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        //yeh data authmiddleware ke jwt.verify se aa rha hai
        id: req.user.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


