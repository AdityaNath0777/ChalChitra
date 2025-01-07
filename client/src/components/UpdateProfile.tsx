import React, { useState } from "react";
import { useUser } from "../contexts";
import { Button } from "./index";
import { Validator } from "../utils/validateInput";
import { FormErrors } from "../types/error";

const UpdateProfile = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    _id: user?._id || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
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
      fullName: !Validator.validateName(formData.fullName.trim()).isValid
        ? "Full Name must be 1 to 50 characters long and first letter should be capital"
        : false,

      email: !Validator.validateEmail(formData.email).isValid ? "Valid email is required" : false,
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // inject files into the object
    // call register logic
    if (validate()) {
      updateUser(formData);
      // alert("validation complete!, everything is alright");
    } else alert("kuch to gadbad hai");
  };

  // const [previewImg, setPreviewImg] = useState({});

  // const handlePreviewImg = (e) => {
  //   const { name, files } = e.target;
  //   const imgURL = URL.createObjectURL(e.target.files[0]);
  //   setPreviewImg((prev) => ({
  //     ...prev,
  //     [name]: {
  //       path: imgURL,
  //       value: files[0],
  //     },
  //   }));

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: files[0],
  //   }));
  // };

  return user ? (
    <div className="w-full mx-auto my-4">
      <h1 className="text-4xl text-center main-font">Update Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 my-8 w-3/5 mx-auto "
        noValidate
      >
        <label className="flex gap-3 w-full">
          <div className="min-w-20 text-left">Full Name</div>
          <input
            className="px-2 py-1 text-slate-900 font-semibold rounded"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          {errors.fullName ? (
            <p className="bg-red-500 text-white px-2 py-1 rounded">
              {errors.fullName}
            </p>
          ) : (
            <></>
          )}
        </label>
        <label className="flex gap-3 w-full">
          <div className="min-w-20 text-left">Email</div>
          <input
            className="px-2 py-1 text-slate-900 font-semibold rounded"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-required
          />
          {errors.email ? (
            <p className="bg-red-500 text-white px-2 py-1 rounded">
              {errors.email}
            </p>
          ) : (
            <></>
          )}
        </label>
        <Button
          type="submit"
          className="bg-green-500 my-4 hover:bg-green-600 duration-150 active:translate-y-1"
          textSize="1.rem"
        >
          Update Changes
        </Button>
      </form>
    </div>
  ) : (
    <h2 className="bg-red-500 text-white px-4 py-2">User not found</h2>
  );
};

export default UpdateProfile;
