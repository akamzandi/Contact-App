import { Outlet } from "react-router-dom";
import Header from "./Header";

const SharedLayout = ({ editContactMode }) => {
  return (
    <>
      <Header editContactMode={editContactMode} />
      <Outlet />
    </>
  );
};

export default SharedLayout;
