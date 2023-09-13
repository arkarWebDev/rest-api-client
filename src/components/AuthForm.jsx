import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// fromik custom error message
import StyledErrorMessage from "./StyledErrorMessage";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const AuthForm = ({ isLogin }) => {
  const { updateToken } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const AuthFormSchema = Yup.object({
    username: isLogin
      ? null
      : Yup.string()
          .min(3, "Username is too short!")
          .max(10, "Username is too long!")
          .required("Username is required!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Please enter an vaild email!"),
    password: Yup.string()
      .min(4, "Password is too short!")
      .required("Password is required!"),
  });

  const submitHandler = async (values) => {
    const { email, password, username } = values;
    let END_POINT = `${import.meta.env.VITE_API}/register`;

    if (isLogin) {
      END_POINT = `${import.meta.env.VITE_API}/login`;
    }
    const response = await fetch(END_POINT, {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const toastFire = (message) => {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };

    const responseData = await response.json();
    if (response.status === 201) {
      setRedirect(true);
    } else if (response.status === 200) {
      updateToken(responseData);
      setRedirect(true);
    } else if (response.status === 400) {
      const pickedMessage = responseData.errorMessages[0].msg;
      toastFire(pickedMessage);
    } else if (response.status === 401) {
      toastFire(responseData.message);
    }
  };

  if (redirect) {
    return <Navigate to={isLogin ? "/" : "/login"} />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={AuthFormSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className=" w-1/2 mx-auto">
            <h1 className=" text-center font-bold text-4xl my-4 text-teal-600">
              {isLogin ? "Login" : "Register"}
            </h1>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="username" className=" font-medium block">
                  username
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
                />
                <StyledErrorMessage name="username" />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className=" font-medium block">
                email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className=" font-medium block">
                password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="password" />
            </div>
            <button
              className=" text-white bg-teal-600 py-3 font-medium w-full text-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isLogin
                ? `${isSubmitting ? "Submitting ..." : "Login"}`
                : ` ${isSubmitting ? "Submitting" : "Register"}`}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
