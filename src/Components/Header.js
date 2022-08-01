import { NavLink } from "react-router-dom";
const Header = ({ editMode }) => {
  const linkManger = () => {
    if (editMode) {
      return (
        // <button className="disabledLink" disabled={true}>
        //   Contact List
        // </button>
        <p className="contactList-link">Contact List</p>
      );
    } else {
      return (
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/"
        >
          Contacts List
        </NavLink>
      );
    }
  };

  return (
    <header>
      <h2 className="app-title">Contact Manager</h2>
      <nav>
        {linkManger()}
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="addEditContact"
        >
          {editMode ? "Edit Contact" : "Add Contact"}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
