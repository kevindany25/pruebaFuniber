import mongoose from "mongoose";

const formSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  },
  area: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
});

export default mongoose.model('sended-mails', formSchema);