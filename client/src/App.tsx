// import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, UserProvider, ThemeProvider } from "@shared/contexts";
import Layout from "./Layout";

function App() {
  console.log("app");

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider>
            <Router>
              <Layout />
            </Router>
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
