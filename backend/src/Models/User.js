import mongoose from "mongoose";
 

const userSchema = new mongoose.Schema({
   username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['Student', 'Faculty', 'Director', 'Placement'],
    required: true,
  },

  loginType: {
    type: String,
    enum: ['Student', 'Faculty'],
    required: true,
  },

  refId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'loginType', // dynamically references Student or Faculty model
    required: true,
  },

  mustChangePassword: {
    type: Boolean,
    default: true, // true for first login with dummy password
  },

  lastLogin: {
    type: Date,
    default: null,
  },

  createdBy: {
    type: String,
    default: 'admin', // or director who created the account
  },

}, {
  timestamps: true // adds createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);
export default User;