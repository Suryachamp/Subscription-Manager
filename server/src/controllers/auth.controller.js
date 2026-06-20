const prisma = require('@prisma/client')
const bcrypt = require("bcrypt")

exports.register = async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        //validates request body
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required",
            });
        }

        //check if the user is already existing or not
        
    }
}