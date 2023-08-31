import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../authentication/firebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUserEmail } = useContext(UserContext);

  const goToLoginPage = () => {
    navigate("/login");
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      setUserEmail(user.email);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">New Users</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <button type="button" onClick={goToLoginPage}>
          Go back to Login Page
        </button>
      </form>
    </div>
  );
}
