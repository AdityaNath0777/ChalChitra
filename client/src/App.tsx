// import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AuthProvider,
  UserProvider,
  ThemeProvider,
  LayoutProvider,
} from "@shared/contexts";
import Layout from "./Layout";
import { VideoProvider } from "@features/video/hooks/VideoContext";

function App() {
  console.log("app");

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider>
            <LayoutProvider>
              <VideoProvider>
                <Router>
                  <Layout />
                </Router>
              </VideoProvider>
            </LayoutProvider>
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
