import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../authentication/firebase";
import UserContext from "../../context/UserContext";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUserEmail } = useContext(UserContext);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
      const user = auth.currentUser;
      setUserEmail(user.email);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      setUserEmail(user.email);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-container">
      <h1 className="login-title">Travel Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
        <button type="submit">Submit</button>
        <button type="button" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
        <div className="link-container">
          <Link to="/signup">Need an account? Sign up here.</Link>
        </div>
      </form>
    </div>
  );
}
