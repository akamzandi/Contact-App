import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import NavBar from "../Navbar/NavBar";
import "./sharedLayout.css";

const SharedLayout = ({ editContactMode }) => {
  return (
    <>
      <div className="sharedLayout-header">
        <Header />
      </div>
      <div className="sharedLayout-body">
        <NavBar editContactMode={editContactMode} />
        <Outlet />
      </div>
    </>
  );
};

export default SharedLayout;
