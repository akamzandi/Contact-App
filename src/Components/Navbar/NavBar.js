import { NavLink } from "react-router-dom";
import "./navBar.css";

const NavBar = ({ editContactMode }) => {
  const renderProperLinks = () => {
    if (editContactMode) {
      return (
        <>
          <p className="contactList-link">Contact List</p>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="addEditContact"
          >
            {editContactMode ? "Edit Contact" : "Add Contact"}
          </NavLink>
          <p className="contactList-link">tags</p>
        </>
      );
    } else {
      return (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="addEditContact"
          >
            {editContactMode ? "Edit Contact" : "Add Contact"}
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
            to="/"
          >
            Contacts List
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : "")}
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
