import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';

import User, {userSchema} from "../model/user.js"

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {

  const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
  });

  let error = user.validateSync();
  console.log(error);

  await user.save().then((res) => console.log(res));;
  res.send(user);
});

router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  let result

  try {
    const Users  = mongoose.model('User', userSchema)
    result = await Users.findById(userId).exec()
    console.log(result, "result");
  } catch (error) {
    console.log(error);
  }
    res.send(result).status(200);

})


export default router;
