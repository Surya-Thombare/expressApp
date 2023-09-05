import express from 'express';
var router = express.Router();
import Favourite, { favouriteSchema } from "../model/fav.js";
import mongoose from 'mongoose';


router.get('/favourites', async (req, res) => {
    let result
    try {
        const Favourite = mongoose.model('Favourite', favouriteSchema)
        result = await Favourite.find().exec()
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    res.send(result).status(200);
});


router.post('/favourites', async (req, res) => {
    const favourite = new Favourite({
        countryId: req.body.countryId,
        userId: req.body.userId,
    });

    const error = favourite.validateSync();
    if (error) return res.status(400).send(error.details[0].message);

    await favourite.save().then((res) => console.log(res));;
    res.send(favourite);
})


export default router;
