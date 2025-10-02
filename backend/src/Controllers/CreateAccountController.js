import Student from "../Models/Student.js";
import User from "../Models/User.js";
import Faculty from "../Models/Faculty.js";
import bcrypt from "bcrypt";

// export const createStudentAccount = async (req, res) => {
//   try {
//     const { user, student } = req.body;

//     // Basic payload validation
//     if (!user || !student) {
//       return res.status(400).json({ message: "Missing 'user' or 'student' in request body" });
//     }

//     if (!user.email) {
//       return res.status(400).json({ message: "User email is required" });
//     }

//     if (!user.password) {
//       return res.status(400).json({ message: "User password is required" });
//     }

//     if (!student.branch || typeof student.year === 'undefined') {
//       return res.status(400).json({ message: "Student 'branch' and 'year' are required" });
//     }

//     const userExists = await User.findOne({ email: user.email });
//     if (userExists) {
//       return res.status(409).json({ message: "Student user already exists" });
//     }

//     const newStudent = await Student.create({
//       ...student,
//       createdBy: "admin"
//     });

//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     const newUser = await User.create({
//       name: user.name ?? student.name,
//       email: user.email,
//       password: hashedPassword,
//       role: user.role ?? 'Student',
//       loginType: user.loginType ?? 'Student',
//       refId: newStudent._id,
//       mustChangePassword: true,
//       createdBy: "admin"
//     });

//     res.status(201).json({
//       message: "Student account created successfully",
//       user: newUser,
//       profile: newStudent
//     });

//   } catch (error) {
//     console.error(error.stack);
//     res.status(500).json({ message: "Error creating student account" });
//   }
// };


export const createStudentAccount = async (req, res) => {
  try {
    const { user, student } = req.body;

    // Validate required fields
    if (!user?.email || !user?.password || !student?.branch || !student?.year) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check for existing user
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      return res.status(409).json({ message: "Student user already exists" });
    }

    //Create Student profile (no email or name here)
    const newStudent = await Student.create({
      ...student,
      createdBy: "admin"
    });

    // Create User account
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await User.create({
      name:user.name,
      email: user.email,
      password: hashedPassword,
      role: "Student",
      loginType: "Student",
      refId: newStudent._id,
      mustChangePassword: true,
      createdBy: "admin"
    });

    res.status(201).json({
      message: "Student account created successfully",
      user: newUser,
      profile: newStudent
    });

  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Error creating student account" });
  }
};

 

export const createFacultyAccount = async (req, res) => {
  try {
    const { user, faculty } = req.body;

    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      return res.status(409).json({ message: "Faculty already exists" });
    }

    const newFaculty = await Faculty.create({
      ...faculty,
      
    });

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await User.create({
      ...user,
      password: hashedPassword,
      refId: newFaculty._id,
      mustChangePassword: true,
       
    });

    res.status(201).json({
      message: "Faculty account created successfully",
      user: newUser,
      profile: newFaculty
    });

  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Error creating faculty account" });
  }
};
