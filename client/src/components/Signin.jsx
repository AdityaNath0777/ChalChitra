import React, { useState } from "react";
import { useUser } from "../contexts";
import { Button } from "./index";
import { Navigate } from "react-router-dom";

const Signin = () => {
  const { registerUser, error, isLoggedIn } = useUser();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    // avatar: "",
    // coverImage: "",
    password: "",
    confPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confPassword: "",
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
      fullName: !/^[A-ZÀ-ÿ][-a-zA-ZÀ-ÿ'., ]{0,49}$/.test(
        formData.fullName.trim()
      )
        ? "Full Name must be 1 to 50 characters long and first letter should be capital"
        : false,

      username: !/^[a-z0-9à-ÿ._]{1,50}$/.test(formData.username.trim())
        ? "Username must be 1 to 50 characters long, in lowercase, and may include dots and underscores"
        : false,

      email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
        ? "Valid email is required"
        : false,

      // password should be -> 8 long
      password:
        formData.password.length < 8
          ? "Password must be at least 8 characters long"
          : false,

      // password and confirm password should match
      confPassword:
        formData.confPassword !== formData.password ||
        formData.confPassword.length === 0
          ? "Password must be same"
          : false,
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // inject files into the object
    // call register logic
    if (validate()) {
      registerUser(formData);
      alert("validation complete!, everything is alright");
    }

    // setFormData({
    //   fullName: "",
    //   username: "",
    //   email: "",
    //   // avatar: "",
    //   // coverImage: "",
    //   password: "",
    //   confPassword: "",
    // });
  };

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [previewImg, setPreviewImg] = useState({});

  const handlePreviewImg = (e) => {
    const { name, files } = e.target;
    const imgURL = URL.createObjectURL(e.target.files[0]);
    setPreviewImg((prev) => ({
      ...prev,
      [name]: {
        path: imgURL,
        value: files[0],
      },
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // useEffect(() => {
  //   return () => {
  //     Object.values(previewImg).forEach(({ path }) => URL.revokeObjectURL(path));
  //   };
  // }, [previewImg]);

  // const handleAvatarChange = (e) => {
  //   setAvatar(e.target.files[0])
  //   console.log(e.target.files[0]);
  // }
  // const handleCoverImageChange = (e) => {
  //   setCoverImage(e.target.files[0])
  //   console.log(e.target.files[0]);
  // }
  return isLoggedIn ? (
    <Navigate to={"/profile"} />
  ) : (
    <div className="w-full mx-auto my-4">
      <form
        method="POST"
        noValidate
        onSubmit={handleSubmit}
        className="w-full mx-auto gap-4 text-slate-900 flex flex-col items-center"
      >
        <div className="img-input w-full grid grid-cols-2 place-items-center justify-items-center">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="mx-auto"
            style={{ width: "120px" }}
            onChange={handlePreviewImg}
          />
          <img
            src={previewImg?.avatar?.path || "/vite.svg"}
            alt=""
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />
        </div>
        <div className="img-input w-full grid grid-cols-2 place-items-center justify-items-center ">
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            className="mx-auto"
            style={{ width: "120px" }}
            onChange={handlePreviewImg}
          />
          <img
            src={previewImg?.coverImage?.path || "/vite.svg"}
            alt=""
            style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />
        </div>
        <input
          type="name"
          name="fullName"
          placeholder="full name"
          value={formData.fullName}
          className={`w-full px-4 text-xl rounded py-2 ${
            errors?.fullName ? "text-red-600 border-red-600" : ""
          }`}
          onChange={handleInputChange}
        />
        {errors?.fullName && (
          <p
            className={`bg-red-600 rounded text-slate-200 border-2 border-slate-200 w-full text-sm text-center px-3 py-2`}
          >
            {errors?.fullName}
          </p>
        )}
        <input
          type="name"
          name="username"
          placeholder="username"
          value={formData.username}
          className={`w-full px-4 text-xl rounded py-2 ${
            errors?.username ? "text-red-600 border-red-600" : ""
          }`}
          onChange={handleInputChange}
        />
        {errors?.username && (
          <p
            className={`bg-red-600 rounded text-slate-200 border-2 border-slate-200 w-full text-sm text-center px-3 py-2`}
          >
            {errors?.username}
          </p>
        )}
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
        <input
          type="password"
          name="confPassword"
          placeholder="confirm password"
          value={formData.confPassword}
          className={`w-full px-4 text-xl rounded py-2  ${
            errors?.confPassword ? "text-red-600 border-red-600" : ""
          }`}
          onChange={handleInputChange}
        />
        {errors?.confPassword && (
          <p className="bg-red-600 rounded text-slate-200 border-2 border-slate-200 w-full text-sm text-center px-3 py-2">
            {errors?.confPassword}
          </p>
        )}
        <Button
          className={"bg-green-500 w-full px-4 text-xl rounded py-2"}
          textSize={"1.2rem"}
          type={"submit"}
        >
          Sign In
        </Button>
      </form>
      {(error.message || error.status) && (
        <p className="text-center font-bold text-2xl main-font  bg-red-500 border-2 rounded px-3 py-2 mt-10">
          Sign In Failed!! <br />
          <span className="text-6xl">☠️</span>
        </p>
      )}
    </div>
  );
};

export default Signin;
