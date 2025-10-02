import mongoose from "mongoose";
const { Schema } = mongoose;

const academicProfileSchema = new Schema({
  title: { type: String, required: true },  
  skills: [String], 
  resume: { type: String, trim: true }, 
  tags: [String], 
}, { _id: false });  

const studentSchema = new Schema({
  // email:{type:String}, 
  branch: { type: String, required: true, trim: true },
  year: { type: Number, required: true, min: 1, max: 5 },

  academicProfiles: [academicProfileSchema],

  bookmarks: {
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    apps: [{ type: Schema.Types.ObjectId, ref: 'App' }],
  },

  achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }],
  clubs: [{ type: Schema.Types.ObjectId, ref: 'Club' }],

  createdBy: { type: String, default: 'admin' },  
}, {
  timestamps: true  
});

const Student = mongoose.model("Student", studentSchema);
export default Student;