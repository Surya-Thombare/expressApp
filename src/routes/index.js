import express from 'express';
var router = express.Router();
import Country, { countrySchema }  from "../model/countries.js";
import Favourite, { favouriteSchema } from "../model/fav.js";
import User, { userSchema } from "../model/user.js"
import moment from 'moment';
import db from "../auth/db.js";
import mongoose from 'mongoose';


/* GET home page. */
router.get('/', (req, res) => {
  res.send("Health ok")
})

router.get('/countries', async (req, res, next) => {
  let result
  try {
    const Countries  = mongoose.model('Country', countrySchema)
    result = await Countries.find().exec()
    console.log(result);
  } catch (error) {
    console.log(error);
  }
    res.send(result).status(200);
});

router.post('/addcountry',async (req, res) => {

  let today = moment().format('D MMM, YYYY');

  const country = new Country({
      countryName: req.body.countryName,
      language: req.body.language,
      createdAt: today
  });

  let error = country.validateSync();
  console.log(error);

  await country.save().then((res) => console.log(res));;
  res.send(country);
  });

router.get('/countries/:countryId',async (req, res) => {
  const countryId = req.params.countryId;

  let result1
  const result = {}
  try {
    const Favourite = mongoose.model('Favourite', favouriteSchema)
    result1 = await Favourite.find({ countryId: countryId })
  } catch (error) {
    console.log(error);
  }

  result1.forEach((item) => {
    const countryId = item.countryId;
    const userId = mongoose.Types.ObjectId(item.userId);

    if (!result[countryId]) {
      result[countryId] = [];
    }

    result[countryId].push(userId);
  });

  const outputArray = Object.entries(result).map(([countryId, userIds]) => ({
    countryId,
    userIds,
  }));

  const userIdsArray = outputArray[0].userIds

  let usersArray
  try {
    const Countries = mongoose.model('Users', userSchema)
    usersArray = await Countries.find({
      _id: userIdsArray
    }).exec()
    console.log(usersArray);
  } catch (error) {
    console.log(error);
  }

  res.send(usersArray).status(200)
})

export default router;
