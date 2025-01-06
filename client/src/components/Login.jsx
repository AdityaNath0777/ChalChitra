import React, { useState } from "react";
import Button from "./Button";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts";

const Login = () => {
  const { loginUser, error, isLoggedIn } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErr) => ({ ...prevErr, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {
      email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
        ? "Valid email is required"
        : false,

      // password should be -> 8 long
      password:
        formData.password.length < 8
          ? "Password must be at least 8 characters long"
          : false,
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      loginUser(formData);
    }
  };
  return isLoggedIn ? (
    <Navigate to={"/profile"} replace />
  ) : (
    <div className="w-full mx-auto my-4">
      <form
        method="POST"
        noValidate
        onSubmit={handleSubmit}
        className="w-full mx-auto gap-4 text-slate-900 flex flex-col items-center"
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          className={`w-full px-4 text-xl rounded py-2 ${
            errors?.email ? "text-red-600 border-red-600" : ""
          }`}
          onChange={handleInputChange}
        />
        {errors?.email && (
          <p
            className={`bg-red-600 rounded text-slate-200 border-2 border-slate-200 w-full text-sm text-center px-3 py-2`}
          >
            {errors?.email}
          </p>
        )}
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          className={`w-full px-4 text-xl rounded py-2  ${
            errors?.password ? "text-red-600 border-red-600" : ""
          }`}
          onChange={handleInputChange}
        />
        {errors?.password && (
          <p className="bg-red-600 rounded text-slate-200 border-2 border-slate-200 w-full text-sm text-center px-3 py-2">
            {errors?.password}
          </p>
        )}
        <Button
          className={"bg-green-500 w-full px-4 text-xl rounded py-2"}
          textSize={"1.2rem"}
          type={"submit"}
        >
          Login
        </Button>
      </form>
      {(error.message || error.status) && (
        <p className="text-center font-bold text-2xl main-font  bg-red-500 border-2 rounded px-3 py-2 mt-10">
          Login Failed!! <br />
          <span className="text-6xl">☠️</span>
        </p>
      )}
    </div>
  );
};

export default Login;
