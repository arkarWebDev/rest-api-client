import { Outlet } from "react-router-dom";

import Nav from "../components/Nav";

const Main = () => {
  return (
    <section>
      <Nav />
      <Outlet />
    </section>
  );
};

export default Main;
