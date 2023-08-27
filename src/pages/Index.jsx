import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";
import { Watch } from "react-loader-spinner";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
  };

  useEffect((_) => {
    getNotes();
  }, []);

  return (
    <section className="flex gap-6 px-10 mt-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </>
      ) : (
        <div className="flex justify-center items-center w-full">
          <Watch
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={loading}
          />
        </div>
      )}
      <Plus />
    </section>
  );
};

export default Index;
