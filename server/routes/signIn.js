import bcrypt from "bcrypt";
import joi from "joi";
import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = joi.object({
    email: joi.string().min(3).max(200).email().required(),
    password: joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(500).send(error.details[0].message);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`invalid pass or email exist...`);

    const validpass = await bcrypt.compare(req.body.password, user.password);
    if (!validpass) return res.status(400).send(`${pass} wrong`);

    const secretKey = process.env.SECRET_KEY; //encrypt and decrypt data (pass)
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );

    res.send(token);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});
export default router;
