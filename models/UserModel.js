import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model('User', UserSchema);
