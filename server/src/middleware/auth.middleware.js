const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next) => {
    try{

        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message:"Authentication required",
            });
        }
        

        //isse data user controller me jayega 
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message:"Invalid token",
        });
    }
};

module.exports = authMiddleware;