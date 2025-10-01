import mongoose from "mongoose";
const Schema = mongoose.Schema;

const facultySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, index: true, required: true },
  department: { type: String, required: true },
  roles: [
    {
      type: { type: String, enum: ['dsw', 'placement', 'examination'], required: true },
      from: { type: Date, default: Date.now },
      to: { type: Date, default: null },
    }
  ],
  mentionsCreated: [{ type: Schema.Types.ObjectId, ref: 'Mentions' }],
});

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;