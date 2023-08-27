import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import formatISO9075 from "date-fns/formatISO9075";

const Note = ({ note, getNotes, customAlert }) => {
  const { _id, title, content, createdAt } = note;

  const deleteNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
      method: "delete",
    });
    if (response.status === 204) {
      customAlert("Post deleted.");
      getNotes();
    }
  };

  return (
    <div className=" w-2/5 border-t-4 border-t-teal-600 shadow-lg p-3 h-fit">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-sm">{content.slice(0, 120)}</p>
      <div className=" flex items-center justify-between mt-2 border-t pt-2">
        <p className=" text-sm font-medium">
          {formatISO9075(new Date(createdAt), { representation: "date" })}
        </p>
        <div className="flex items-center justify-end gap-2">
          <TrashIcon
            width={20}
            className=" text-red-600 cursor-pointer"
            onClick={deleteNote}
          />
          <Link to={"/edit/" + _id}>
            <PencilSquareIcon width={20} className="text-teal-600" />
          </Link>
          <Link to={"/notes/" + _id}>
            <EyeIcon width={20} className=" text-gray-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Note;
