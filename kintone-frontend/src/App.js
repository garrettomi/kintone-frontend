import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import UserContext from "./context/UserContext";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  // const isLoggedIn = userEmail !== null;
  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={<Home />}
            // element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
