// To Combines all feature routes dynamically.

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  LoginForm,
  ProtectedRoute,
  SignUpForm,
} from "@features/auth/components";
import { UserProfile } from "@features/user/components";
import Home from "@features/home/components/Home";
import TweetPage from "@features/tweet/components/TweetPage";
import WatchVideoPage from "@features/home/components/WatchVideoPage";
import ChannelProfile from "@features/user/components/ChannelProfile";
import SubscriptionPage from "@features/subscription/components/SubscriptionPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={"/"} element={<Navigate to={"/home"} replace />} />
      <Route path={"/home"} element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/channel/:channelId" element={<>user channel</>} />
      </Route> */}
      <Route element={<ProtectedRoute />}>
        <Route path="/twitter" element={<TweetPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<>protected dashboard...</>} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/watch" element={<WatchVideoPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/channel/:username" element={<ChannelProfile />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/subscriptions" element={<SubscriptionPage />} />
      </Route>
      {/* Fallback Route: Page Not Found */}
      <Route path="*" element={<>Page Not Found...</>} />
    </Routes>
  );
};

export default AppRoutes;
