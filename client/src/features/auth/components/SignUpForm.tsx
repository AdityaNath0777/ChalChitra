import React, { useEffect, useState } from "react";
import { useAuth } from "@shared/hooks";
import { Button } from "@shared/components";
import { useNavigate } from "react-router-dom";
import { FormErrors } from "@shared/types/error.types";
import { Validator } from "@shared/utils/validateInput";

interface FieldInfo {
  name: string;
  isRequired: boolean;
}

interface FormFields {
  fullName: FieldInfo;
  username: FieldInfo;
  email: FieldInfo;
  password: FieldInfo;
  confPassword: FieldInfo;
  avatar: FieldInfo;
  coverImage?: FieldInfo;
}

const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, authError, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    avatar: "",
    coverImage: "",
    password: "",
    confPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    password: "",
    confPassword: "",
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
    const newErrors: FormErrors = {};

    // Full Name Validation
    const nameValidation = Validator.validateName(formData.fullName.trim());
    if (!nameValidation.isValid) {
      newErrors.fullName = nameValidation.errorMessage;
    }

    // Username Validation
    const usernameValidation = Validator.validateUsername(
      formData.username.trim()
    );
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.errorMessage;
    }

    // Email Validation
    const emailValidation = Validator.validateEmail(formData.email.trim());
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.errorMessage;
    }

    // Password Validation
    const passwordValidation = Validator.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errorMessage;
    }

    // Confirm Password Validation
    if (formData.confPassword !== formData.password) {
      newErrors.confPassword = "Passwords must match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    // inject files into the object
    // call register logic
    if (validate()) {
      register(formData);
      alert("validation complete!, everything is alright");
    }
  };

  // .....................
  // Image preview handler
  const [previewImg, setPreviewImg] = useState<{
    [key: string]: { path: string; value: File };
  }>({});

  const handlePreviewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      const imgURL = URL.createObjectURL(files[0]);
      setPreviewImg((prev) => ({
        ...prev,
        [name]: {
          path: imgURL,
          value: files[0],
        },
      }));

      setFormData((prev) => ({
        ...prev,
        [name]: files[0] as any,
      }));
    }
  };

  // cleanup function: so that each time previewImg updates
  // or the component umounts,
  // the unused object URLs are cleaned up.
  useEffect(() => {
    return () => {
      Object.values(previewImg).forEach(({ path }) =>
        URL.revokeObjectURL(path)
      );
    };
  }, [previewImg]);

  const formFields: FormFields = {
    fullName: { name: "Full Name", isRequired: true },
    username: { name: "Username", isRequired: true },
    email: { name: "Email", isRequired: true },
    password: { name: "Password", isRequired: true },
    confPassword: { name: "Confirm Password", isRequired: true },
    avatar: { name: "Avatar", isRequired: true },
    coverImage: { name: "Cover Image", isRequired: false },
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="w-full mx-auto my-4">
      <form
        method="POST"
        noValidate
        onSubmit={handleSubmit}
        className="w-full mx-auto gap-4 text-slate-900 flex flex-row items-center justify-between"
      >
        <div className="image-form-section w-1/3 flex flex-col gap-4 items-center justify-between">
          {["avatar", "coverImage"].map((field) => (
            <div
              className="img-input w-full flex gap-4 items-center justify-around"
              key={`sigin-image-${field}`}
            >
              <div className="img-input-container flex flex-col gap-3">
                <label
                  htmlFor={`sigin-image-${field}`}
                  className="text-white text-left"
                >
                  {(formFields[field as keyof FormFields] as FieldInfo).name}
                  {(formFields[field as keyof FormFields] as FieldInfo)
                    .isRequired ? (
                    <span className="text-red-600">*</span>
                  ) : (
                    <></>
                  )}
                </label>
                <label
                  htmlFor={`sigin-image-${field}`}
                  className="custom-file-button bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Choose File
                </label>
                <input
                  id={`sigin-image-${field}`}
                  type="file"
                  name={field}
                  accept="image/*"
                  className="mx-auto"
                  style={{ display: "none" }}
                  onChange={handlePreviewImg}
                  required={
                    (formFields[field as keyof FormFields] as FieldInfo)
                      .isRequired
                  }
                />
              </div>
              <label
                htmlFor={`sigin-image-${field}`}
                className="cursor-pointer"
              >
                <img
                  src={previewImg?.[field]?.path || "/vite.svg"}
                  alt={field}
                  className={`border-2 border-gray-200`}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              </label>
            </div>
          ))}
        </div>
        <div className="right-form-section w-1/2 mx-auto">
          <div className="text-form-section">
            {["fullName", "username", "email", "password", "confPassword"].map(
              (field) => (
                <React.Fragment key={field}>
                  <label
                    htmlFor={`sigin-${field}`}
                    className="flex w-full bg-white rounded px-2 border focus-within:bg-gray-300"
                  >
                    {(formFields[field as keyof FormFields] as FieldInfo)
                      .isRequired ? (
                      <span className="text-red-600 text-xl">*</span>
                    ) : (
                      <></>
                    )}
                    <input
                      type={
                        ["password", "confPassword"].includes(field)
                          ? "password"
                          : "text"
                      }
                      id={`sigin-${field}`}
                      name={field}
                      placeholder={
                        (formFields[field as keyof FormFields] as FieldInfo)
                          .name
                      }
                      value={(formData as any)[field]}
                      className={`w-full outline-none bg-transparent px-4 text-xl rounded py-2 ${
                        errors[field] ? "text-red-600 border-red-600" : ""
                      }`}
                      onChange={handleInputChange}
                      required={
                        (formFields[field as keyof FormFields] as FieldInfo)
                          .isRequired
                      }
                      aria-required
                    />
                  </label>
                  {errors[field] && (
                    <p className="bg-red-600 rounded text-slate-200 border-2 border-slate-200 w-full text-sm text-center px-3 py-2">
                      {errors[field]}
                    </p>
                  )}
                </React.Fragment>
              )
            )}
          </div>
          <Button
            className={
              "bg-green-500 mt-4 text-gray-50 font-medium w-full px-4 text-xl rounded py-2"
            }
            textSize={"1.2rem"}
            type={"submit"}
          >
            Sign Up
          </Button>
        </div>
      </form>
      {authError?.message || authError?.status ? (
        <p className="text-center font-bold text-2xl main-font  bg-red-500 border-2 rounded px-3 py-2 mt-10">
          Sign Up Failed!! <br />
          <span className="text-6xl">☠️</span>
        </p>
      ) : (
        <></>
      )}
      <div className="go-to-login my-4">
        Already have an account?{" "}
        <span
          className="underline italic cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login Here
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
