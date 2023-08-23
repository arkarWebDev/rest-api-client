import NoteForm from "../components/NoteForm";

const Edit = () => {
  return (
    <section className="px-10 mt-10">
      <NoteForm isCreate={false} />
    </section>
  );
};

export default Edit;
