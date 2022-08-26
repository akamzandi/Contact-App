import { useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Select from "react-select";

import Contact from "../../Components/Contact/Contact";
import "./contactsListPage.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ContactsListPage = ({
  contacts,
  allTags,
  deletContactHandler,
  editContactHandler,
}) => {
  const searchInpRef = useRef();

  const renderContacts = () => {
    if (contacts != "") {
      return contacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          email={contact.email}
          id={contact.id}
          allTags={allTags}
          contacTtags={contact.tags}
          deletContactHandler={deletContactHandler}
          editContactHandler={editContactHandler}
        />
      ));
    } else {
      return <p className="no-contact-msg">There Is No Contact!</p>;
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: "2rem",
      minHeight: "2rem",
    }),
  };

  const handleSearchInpChange = (e) => {
    console.log("search bar: ", e.target.value);
  };

  const handleSearchIcnClick = () => {
    searchInpRef.current.focus();
  };

  return (
    <div className="contactList-page">
      <div className="contactList-navBar">
        <div className="search-section">
          <p onClick={handleSearchIcnClick}>
            <BiSearchAlt2 />
          </p>
          <input
            type="text"
            placeholder="Search for contact..."
            onChange={(e) => handleSearchInpChange(e)}
            ref={searchInpRef}
          />
        </div>
        <div className="filter-section">
          <p>Tag Filter</p>
          {/* <select>
            <option value="some1">some1</option>
            <option value="some2">some2</option>
            <option value="some3">some3</option>
          </select> */}
          <Select
            options={allTags}
            styles={customStyles}
            className="react-selector"
          />
        </div>
      </div>
      {renderContacts()}
    </div>
  );
};

export default ContactsListPage;
