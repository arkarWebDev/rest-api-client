import { ErrorMessage } from "formik";

const SyledErrorMessage = ({ name }) => {
  return (
    <div className="text-red-600 font-medium font-mono">
      <ErrorMessage name={name} />
    </div>
  );
};

export default SyledErrorMessage;
