const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");


const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const userShema = new Schema (
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
          minlenght: 6,
        },
        login: {
          type: String,
          required: [true, 'Login is required'],
          // metch: login,
          unique: true,
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          metch: emailRegex,
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
        },
        avatarURL: {
          type: String,
          required: true,
        },
        verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
          required: [true, 'Verify token is required'],
        }
      },
    { versionKey: false }
);

userShema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    login: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    emailSchema
};

const User = model("user", userShema);

module.exports = {
    schemas,
    User,
}