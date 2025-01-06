import React, { useState } from "react";
import { useUser } from "../contexts";
import { Button } from "./index";

const UpdateProfile = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
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
      fullName: !/^[-a-zA-ZÀ-ÿ'., ]{1,50}$/.test(formData.fullName.trim())
        ? "Full Name must be 1 to 50 characters long and first letter should be capital"
        : false,

      email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
        ? "Valid email is required"
        : false,
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // inject files into the object
    // call register logic
    if (validate()) {
      updateUser(formData);
      // alert("validation complete!, everything is alright");
    } else alert("kuch to gadbad hai");
  };

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

  return (
    <div className="w-full mx-auto my-4">
      <h1 className="text-4xl text-center main-font">Update Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-3/5 mx-auto ">
        <label className="flex gap-3 w-full">
          <div className="min-w-20">Full Name</div>
          <input
            className="px-2 py-1 text-slate-900 font-semibold"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex gap-3 w-full">
          <div className="min-w-20">email</div>
          <input
            className="px-2 py-1 text-slate-900 font-semibold"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <Button>Update Changes</Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
