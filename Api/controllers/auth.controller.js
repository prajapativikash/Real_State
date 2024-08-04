import User from '../modals/user.modal.js'

import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
   const { username, email, password } = req.body;
   const hashedPassword = bcrypt.hashSync(password, 10);
   const newUser = new User({ username, email, password: hashedPassword });

   try {

      await newUser.save();

      res.status(201).json("User creates succesfull");
   }
   catch (error) {
      res.status(500).json(error.message)
   }


};