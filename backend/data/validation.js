const { z } = require("zod");

const signupDtoSchema = z.object({
    name: z.string().min(1, "Name is required."),
    email: z.string().email("Email is required."),
    password: z.string().min(6, "password must be atleast 6 characters."),
})
const signinDtoSchema = z.object({
    email: z.string().email("Email is required."),
    password: z.string().min(6, "password must be atleast 6 characters."),
})

const verificationDtoSchema = z.object({
    verificationCode: z.string().min(1, "Verification Code is required"),
})

module.exports = { signinDtoSchema, signupDtoSchema, verificationDtoSchema }