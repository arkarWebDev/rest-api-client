import { Link } from "react-router-dom";

import { PlusIcon } from "@heroicons/react/24/solid";

const Plus = () => {
  return (
    <Link
      to={"/create"}
      className=" bg-teal-600 p-2 text-white rounded-full w-50 h-50 absolute bottom-28 right-60"
    >
      <PlusIcon width={40} height={40} />
    </Link>
  );
};

export default Plus;
