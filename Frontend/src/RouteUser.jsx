import { Routes, Route } from "react-router-dom";
import Login from "./Auth/login.jsx";
import SignUp from "./Auth/signUp.jsx";
import Whatsapp from './Auth/whatsapp.jsx'

// const PrivateRoute = ({ element }) => {
//   // const token = localStorage.getItem("token");

//   return token ? element : <Navigate to="/login" />;
// };

function RouteUser() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path='/whatsapp' element={<Whatsapp />} />
      
    </Routes>
  );
}

export default RouteUser;