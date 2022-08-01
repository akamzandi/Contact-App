import { Outlet } from "react-router-dom";
import Header from "./Header";

const SharedLayout = ({ editMode }) => {
  return (
    <>
      <Header editMode={editMode} />
      <Outlet />
    </>
  );
};

export default SharedLayout;
