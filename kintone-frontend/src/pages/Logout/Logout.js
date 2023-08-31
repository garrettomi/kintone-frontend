import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const userEmail = useContext(UserContext);

  const handleLogout = () => {
    navigate("/login");
    console.log("User has successfully logged out", userEmail);
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
