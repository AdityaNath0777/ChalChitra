import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, error, isLoggedIn } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      loginUser(formData);
    }
  };

  // if used w/o useEffect as a side-effect
  // Warning: Cannot update a component (`BrowserRouter`) 
  // while rendering a different component (`Login`). 
  // Due to the bad setState() call inside `Login`
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }

    // navigate is also in dependency array
    // bcz => The useNavigate hook returns a new function on each render.
    // i.e. we'll have a new reference for each render
  }, [isLoggedIn, navigate]);

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
          className={`w-full px-4 text-xl rounded py-2 ${
            errors?.email ? "text-red-600 border-red-600" : ""
          }`}
          onChange={handleInputChange}
        />
        {errors?.email ? (
          <p
            className={`bg-red-600 rounded text-slate-200 border-2 border-slate-200 w-full text-sm text-center px-3 py-2`}
          >
            {errors?.email}
          </p>
        ) : (
          <></>
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
        {errors?.password ? (
          <p className="bg-red-600 rounded text-slate-200 border-2 border-slate-200 w-full text-sm text-center px-3 py-2">
            {errors?.password}
          </p>
        ) : (
          <></>
        )}
        <Button
          className={
            "bg-green-500 w-full px-4 text-xl text-gray-50 font-medium rounded py-2"
          }
          textSize={"1.2rem"}
          type={"submit"}
        >
          Login
        </Button>
      </form>
      {error?.message || error?.status ? (
        <p className="text-center font-bold text-2xl main-font  bg-red-500 border-2 rounded px-3 py-2 mt-10">
          Login Failed!! <br />
          <span className="text-6xl">☠️</span>
        </p>
      ) : (
        <></>
      )}
      <div className="go-to-signin my-4">
        Don't have an account?{" "}
        <span
          className="underline italic cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Sign up Here
        </span>
      </div>
    </div>
  );
};

export default Login;
