import { Routes, Route } from "react-router-dom";
import Login from "./Auth/login.jsx";
import SignUp from "./Auth/signUp.jsx";
import Email from './Auth/getEmail.jsx'
import Otp from './Auth/otp.jsx';
import ResetPwd from './Auth/resetPassword.jsx'
import Whatsapp from './Auth/whatsapp.jsx'


function RouteUser() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/getEmail" element={<Email/>} />
      <Route path="/otp" element={<Otp/>} />
      <Route path="/resetPassword" element={<ResetPwd/>}/>
      <Route path='/whatsapp' element={<Whatsapp />} />
      
    </Routes>
  );
}

export default RouteUser;