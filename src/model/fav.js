import pkg from 'mongoose';
const { Schema, model } = pkg;

export const favouriteSchema = new Schema({
    countryId:Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
});

export default model("Favourite", favouriteSchema);