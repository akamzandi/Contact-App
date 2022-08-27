import { useEffect, useRef, useState } from "react";
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
  searchValue,
  setSearchValue,
}) => {
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const searchInpRef = useRef();

  const renderProperContacts = () => {
    if (filteredContacts != "") {
      return filteredContacts.map((contact) => (
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
      height: "1.8rem",
      minHeight: "1.8rem",
    }),
  };

  const searchForContact = (inp) => {
    let filterResult = [];
    filterResult = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(inp.toLowerCase())
    );
    return filterResult;
  };

  const handleSearchInpChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    setFilteredContacts(searchForContact(value));
  };

  const handleSearchIcnClick = () => {
    searchInpRef.current.focus();
  };

  useEffect(() => {
    setFilteredContacts(searchForContact(searchValue));
  }, []);

  return (
    <div className="contactList-page">
      <div className="contactList-navBar">
        <div className="search-section">
          <p onClick={handleSearchIcnClick}>
            <BiSearchAlt2 />
          </p>
          <input
            type="text"
            name="searchInp"
            value={searchValue}
            placeholder="Search for Contact..."
            ref={searchInpRef}
            onChange={(e) => handleSearchInpChange(e)}
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
      {renderProperContacts()}
    </div>
  );
};

export default ContactsListPage;
