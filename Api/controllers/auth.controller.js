import User from '../modals/user.modal.js';
import { errorhandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res, next) => {
   const { username, email, password } = req.body;
   const hashedPassword = bcryptjs.hashSync(password, 10);
   const newUser = new User({ username, email, password: hashedPassword });

   try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
   } catch (error) {
      next(errorhandler(500, error.message));
   }
};

export const signIn = async (req, res, next) => {
   const { email, password } = req.body;

   try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorhandler(404, "User not found"));

      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorhandler(401, "Invalid password"));


      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = validUser._doc;

      res.cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
   } catch (error) {
      next(errorhandler(500, error.message));
   }
};
