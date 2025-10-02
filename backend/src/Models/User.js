import mongoose from "mongoose";
 

const userSchema = new mongoose.Schema({
   name: {
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
    enum: ['Student', 'Faculty', 'Director', 'Placement','Examination','DSW','Developer'],
    required: true,
  },

  loginType: {
    type: String,
    enum: ['Student', 'Faculty','Developer'],
    required: true,
  },

  refId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'loginType',  
    required: true,
  },

  mustChangePassword: {
    type: Boolean,
    default: true, 
  },

  

  createdBy: {
    type: String,
    default: 'admin',  
  },

}, {
  timestamps: true  
});

const User = mongoose.model('User', userSchema);
export default User;