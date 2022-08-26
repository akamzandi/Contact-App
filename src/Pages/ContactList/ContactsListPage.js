import Contact from "../../Components/Contact/Contact";
import "./contactsListPage.css";

const ContactsListPage = ({
  contacts,
  allTags,
  deletContactHandler,
  editContactHandler,
}) => {
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

  return (
    <div className="contactList-page">
      <div className="contactList-navBar">
        <div className="search-section">
          <input type="text" placeholder="Search for contacts" />
        </div>
        <div className="filter-section">
          <p>Tag Filter</p>
          <select>
            <option value="A">Family</option>
            <option value="B">Work</option>
            <option value="C">some long tag</option>
          </select>
        </div>
      </div>
      {renderContacts()}
    </div>
  );
};

export default ContactsListPage;
