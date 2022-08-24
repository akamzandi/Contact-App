import { NavLink } from "react-router-dom";
import "./navBar.css";

const NavBar = ({ editContactMode }) => {
  const renderProperLinks = () => {
    if (editContactMode) {
      return (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="addEditContact"
          >
            {editContactMode ? "Edit Contact" : "Add Contact"}
          </NavLink>
          <p className="disabled-nav-link">Contact List</p>
          <p className="disabled-nav-link">Tags</p>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link " : "")}
            to="addEditContact"
          >
            {editContactMode ? "Edit Contact" : "Add Contact"}
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link " : "")}
            to="/"
          >
            Contacts List
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link " : "")}
            to="tags"
          >
            Tags
          </NavLink>
        </>
      );
    }
  };

  return <nav>{renderProperLinks()}</nav>;
};

export default NavBar;
