import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import UserContext from "./context/UserContext";
import auth from "./authentication/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [authReady, setAuthReady] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        // setIsLoggedIn(true);
      } else {
        setUserEmail(null);
        // setIsLoggedIn(false);
      }
      setIsLoading(false);
      // setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // if (!authReady) {
  //   return <div>Loading...</div>;
  // }

  // const isLoggedIn = userEmail !== null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route
            path="/home"
            element={userEmail ? <Home /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
