import {Routes,Route} from "react-router-dom"
import DevLoginPage from "../pages/DevLoginPage.jsx"
import CreateStudentAccount from "../pages/StudentFormPage.jsx"
import CreateFacultyAccount from "../pages/FacultyFormPage.jsx"
import HomePage from '../pages/HomePage.jsx';
import LoginOptions from "../pages/LoginOptionsPage.jsx"

const RoutesConfig =()=>{
    return(
        <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/about" element={<h1>About page</h1>} />
             <Route path="/devlogin" element={<DevLoginPage />} />
             <Route path="/create/student" element={<CreateStudentAccount />} />
             <Route path="/create/faculty" element={<CreateFacultyAccount />} />
             <Route path="/login-options"  element={<LoginOptions />}  />
 
        </Routes>
    )
}
export default RoutesConfig;