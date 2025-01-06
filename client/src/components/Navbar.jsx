import React from "react";

const Navbar = () => {
  return (
    <div className="px-4 py-2 fixed h-screen left-0 border-r-2 border-gray-500">
      <h1 className="main-font font-bold text-2xl cursor-pointer">Chal Chitra</h1>
      <nav>
        <ul className="w-full flex flex-col gap-4 justify-center">
          <li className="cursor-pointer ">🏡 Home</li>
          <li className="cursor-pointer ">📼 Subscriptions</li>
          <li className="cursor-pointer ">⌚ History</li>
          <li className="cursor-pointer ">🦚 Tweets</li>
          <li className="cursor-pointer ">😎 Profile</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
