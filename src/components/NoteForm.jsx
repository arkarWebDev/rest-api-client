import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// fromik custom error message
import StyledErrorMessage from "./StyledErrorMessage";
import { useState } from "react";

const NoteForm = ({ isCreate }) => {
  const [redirect, setRedirect] = useState(false);

  const initialValues = {
    title: "",
    content: "",
  };

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required."),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required."),
  });

  const submitHandler = async (values) => {
    if (isCreate) {
      const response = await fetch(`${import.meta.env.VITE_API}/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        setRedirect(true);
      } else {
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <section>
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
      {/* Same as */}
      <ToastContainer />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create a new note." : "Edit your note."}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className=" font-medium block">
                Note title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="title" />
            </div>
            <div className="">
              <label htmlFor="content" className=" font-medium block">
                Note content
              </label>
              <Field
                as="textarea"
                rows={4}
                type="text"
                name="content"
                id="content"
                className=" text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
              />
              <StyledErrorMessage name="content" />
            </div>
            <button
              className=" text-white bg-teal-600 py-3 font-medium w-full text-center"
              type="submit"
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
