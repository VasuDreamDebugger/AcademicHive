import Faculty from "../Models/Faculty.js";
import Student from "../Models/Student.js";

export const createFacultyAccount = async (req, res) => {
    try {
        const { name, email, department, roles } = req.body;
        const faculty = new Faculty({ name, email, department, roles });
        await faculty.save();
        res.status(201).json({
            message:"Faculty created successfully",
            data:faculty
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const createStudentAccount =async(req,res)=>{
    try{
        const {name,email,password,branch,year,academicProfiles}=req.body
        const studentExist = await Student.find({email}).select("email");
        if(studentExist){
            res.status(401).json({
                message:"student already exist",
            })
        }
        const newStudent =new Student({
            name,
            email,
            password,
            branch,
            year,
            academicProfiles
        });
        await newStudent.save();
        res.status(201).json({
            message:"student created successfully",
            data:newStudent
        })
    }
    catch(error){
        console.error(error.stack)
    }
}



