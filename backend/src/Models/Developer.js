import mongoose from "mongoose";
const { Schema } = mongoose;

const developerSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:{type:String,required:true},
  privileges: {
    canCreateAccounts: { type: Boolean, default: true },
    canModifySchemas: { type: Boolean, default: false },
    canAccessLogs: { type: Boolean, default: false },
    canToggleFeatures: { type: Boolean, default: false }
  }

 
}, {
  timestamps: true
});

const Developer = mongoose.model("Developer", developerSchema);
export default Developer;
