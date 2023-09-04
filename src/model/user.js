import pkg from 'mongoose';
const { Schema, model } = pkg;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    min: 3,
    max: 15,
  },
  lastName: {
    type: String,
    trim: true,
    min: 3,
    max: 15,
  },
  username: {
    type: String,
    trim: true,
    min: 3,
    max: 18,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minimum: 5,
    maximum: 20,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("User", userSchema);