import express from 'express';
var router = express.Router();
import Country, { countrySchema }  from "../model/countries.js";
import moment from 'moment';
import db from "../auth/db.js";
import mongoose from 'mongoose';


/* GET home page. */
router.get('/', (req, res) => {
  res.send("Health ok")
})

router.get('/countires', async (req, res, next) => {
  const Countries  = mongoose.model('Country', countrySchema)
  // let collection = db.collection("countries");
  // let { document } = await collection.find({})
  //     .limit(20);

  const result = await Countries.find().exec()
  
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

export default router;
