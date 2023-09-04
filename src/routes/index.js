import express from 'express';
var router = express.Router();
import Country from "../model/countries.js";
import moment from 'moment';
import db from "../auth/db.js";

/* GET home page. */
router.get('/', (req, res) => {
  res.send("Health ok")
})

router.get('/countires', async (req, res, next) => {
  let collection = db.collection("countries");
  let results = await collection.find({})
      .toArray();
  
    res.send(results).status(200);
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
