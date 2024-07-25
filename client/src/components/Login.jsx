import React, { useState } from "react";
import Button from "./Button";
import { useUser } from "../contexts";

const Login = () => {
  const { loginUser } = useUser();
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
      loginUser(formData)
    }
  };
  return (
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
          className="w-full px-4 text-xl rounded py-2"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          className="w-full px-4 text-xl rounded py-2"
          onChange={handleInputChange}
        />
        <Button
          className={"bg-green-500 w-full px-4 text-xl rounded py-2"}
          textSize={"1.2rem"}
          type={"submit"}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
