import { useContext, useEffect, useRef, useState } from "react";

import { ArrowLeftIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useParams } from "react-router-dom";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// fromik custom error message
import StyledErrorMessage from "./StyledErrorMessage";

import { UserContext } from "../contexts/UserContext";

const NoteForm = ({ isCreate }) => {
  const { token } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const fileRef = useRef();

  const { id } = useParams();

  const getOldNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (response.status === 200) {
      const note = await response.json();
      setOldNote(note);
    } else {
      setRedirect(true);
    }
  };

  useEffect((_) => {
    if (!isCreate) {
      getOldNote();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    note_id: isCreate ? "" : oldNote._id,
    cover_image: isCreate ? null : oldNote.cover_image,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpg", "image/jpeg"];

  const NoteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required."),
    content: Yup.string()
      .min(5, "Content is too short!")
      .required("Content is required."),
    cover_image: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "File type is not support.",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const handleImageChange = (event, setFieldValue) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setPreviewImg(URL.createObjectURL(selectedImage));
      setFieldValue("cover_image", selectedImage);
    }
  };

  const clearPreviewImg = (setFieldValue) => {
    setPreviewImg(null);
    setFieldValue("cover_image", null);

    fileRef.current.value = "";
  };

  const submitHandler = async (values) => {
    let API = `${import.meta.env.VITE_API}`;
    let method;

    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
      method = "post";
    } else {
      API = `${import.meta.env.VITE_API}/edit`;
      method = "put";
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_image", values.cover_image);
    formData.append("note_id", values.note_id);

    const response = await fetch(API, {
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (response.status === 201 || response.status === 200) {
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
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue, isSubmitting }) => (
          <Form encType="multipart/form-data">
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

            <div className="mb-3">
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
            <div className="mb-3">
              <div className=" flex items-center justify-between">
                <label htmlFor="cover_image" className=" font-medium block">
                  Cover image
                  <span className=" text-xs font-medium ">optional</span>
                </label>
                {previewImg && (
                  <p
                    className="text-base font-medium cursor-pointer text-teal-600"
                    onClick={(_) => {
                      clearPreviewImg(setFieldValue);
                    }}
                  >
                    clear
                  </p>
                )}
              </div>
              {isUpload ? (
                <p
                  className="text-base font-medium cursor-pointer text-teal-600"
                  onClick={(_) => setIsUpload(false)}
                >
                  disable cover image
                </p>
              ) : (
                <p
                  className="text-base font-medium cursor-pointer text-teal-600"
                  onClick={(_) => setIsUpload(true)}
                >
                  upload cover image
                </p>
              )}
              {isUpload && (
                <>
                  <input
                    type="file"
                    name="cover_image"
                    hidden
                    ref={fileRef}
                    onChange={(e) => {
                      handleImageChange(e, setFieldValue);
                    }}
                  />
                  <div
                    className=" border border-teal-600 flex items-center justify-center text-teal-600 border-dashed h-60 cursor-pointer rounded-lg relative overflow-hidden"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <ArrowUpTrayIcon width={30} height={30} className="z-20" />
                    {isCreate ? (
                      <>
                        {previewImg && (
                          <img
                            src={previewImg}
                            alt={"preview"}
                            className=" w-full absolute top-0 left-0 h-full object-cover opacity-80 z-10"
                          />
                        )}
                      </>
                    ) : (
                      <img
                        src={
                          previewImg
                            ? previewImg
                            : `${import.meta.env.VITE_API}/${
                                oldNote.cover_image
                              }`
                        }
                        alt={"preview"}
                        className=" w-full absolute top-0 left-0 h-full object-cover opacity-80 z-10"
                      />
                    )}
                  </div>
                </>
              )}
              <StyledErrorMessage name="cover_image" />
            </div>
            <button
              className=" text-white bg-teal-600 py-3 font-medium w-full text-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isCreate
                ? `${isSubmitting ? "Uploading ..." : "Share Note"}`
                : `${isSubmitting ? "Updating ..." : "Update Note"}`}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NoteForm;
