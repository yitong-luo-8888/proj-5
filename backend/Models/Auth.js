import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6          
  },
  scores: [ 
    {
      quizTitle: { type: String, required: true },
      score: { type: Number, required: true },
      outOf: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    }
  ]
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);  
  next();
});

UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', UserSchema);
