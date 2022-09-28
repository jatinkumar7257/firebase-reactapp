import React, { useContext } from "react";

// Import Pages from ./Pages/index.jsx
import {
  Login,
  Signup,
  Main,
  PageNotFound,
  Logout,
  Profile,
  Settings,
  CurrentChat,
  ForgetPassword,
} from "./Pages";

// Import react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/AuthContext";

const App = () => {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Login />;
    }

    return children
  };

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="accounts/signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="direct/:friendId" element={currentUser ? <CurrentChat /> : <PageNotFound />} />
          <Route path="profile/:userId" element={currentUser ? <Profile /> : <PageNotFound />} />
          <Route path="settings" element={currentUser ? <Settings /> : <PageNotFound />} />
          <Route path="accounts/password/reset/" element={<ForgetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
