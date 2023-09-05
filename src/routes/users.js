import express from 'express';
var router = express.Router();
import mongoose from 'mongoose';

import Favourite, { favouriteSchema } from "../model/fav.js";
import User, { userSchema } from "../model/user.js"
import Country, { countrySchema }  from "../model/countries.js";


/* GET users listing. */
router.get('/', function (req, res, next) {
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
  let result1
  const result = {}
  try {
    const Favourite = mongoose.model('Favourite', favouriteSchema)
    result1 = await Favourite.find({ userId : userId })
  } catch (error) {
    console.log(error);
  }

  console.log(typeof(result1));
  
result1.forEach((item) => {
  const userId = item.userId;
  const countryId = mongoose.Types.ObjectId(item.countryId);

  if (!result[userId]) {
      result[userId] = [];
  }

  result[userId].push(countryId);
});

// Convert the result object into an array of objects
const outputArray = Object.entries(result).map(([userId, countryIds]) => ({
  userId,
  countryIds,
}));
// console.log(outputArray[0]);

const countryIdsArray = outputArray[0].countryIds

let countriesArray
  try {
    const Countries  = mongoose.model('Country', countrySchema)
    countriesArray = await Countries.find({
      _id : countryIdsArray
    }).exec()
    console.log(countriesArray);
  } catch (error) {
    console.log(error);
  }


  res.send(countriesArray).status(200);

})


export default router;
