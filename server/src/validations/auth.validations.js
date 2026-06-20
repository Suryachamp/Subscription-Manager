const {z} = require("zod")

const registerSchema = z.object({
    name:z
        .string()
        .min(3, "Name must be at least 3 characteres")
        .trim(),
    
    email:z
        .string()
        .email("Please provide a valid email")
        .toLowerCase(),

    password:z
        .string()
        .min(8,"Password must be of atleast 9 characters"),
});

module.exports = {
    registerSchema,
};