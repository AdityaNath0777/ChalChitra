import React from "react";

const Navbar = () => {
  return (
    <div className="px-4 py-2 fixed h-screen top-0 left-0 border-r-2 border-gray-500">
      <h1 className="main-font font-bold text-2xl">Chal Chitra</h1>
      <nav>
        <ul className="w-full flex flex-col gap-4 justify-center">
          <li>🏡 Home</li>
          <li>📼 Subscriptions</li>
          <li>⌚ History</li>
          <li>🦚 Tweets</li>
          <li>😎 Profile</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
