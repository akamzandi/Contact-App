import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <h2 className="app-title">Contact Manager</h2>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="/"
        >
          Contacts List
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "")}
          to="addContact"
        >
          Add New Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
