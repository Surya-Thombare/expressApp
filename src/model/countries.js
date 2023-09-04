import pkg from 'mongoose';
const { Schema, model } = pkg;

const countrySchema = new Schema({
    countryName: {
    type: String,
    trim: true,
    min: 3,
    max: 15,
  },
  language: {
    type: String,
    trim: true,
    min: 3,
    max: 15,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Country", countrySchema);