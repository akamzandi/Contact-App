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
        <div className="search-section">Put Search Here</div>
        <div className="filter-section">Put Filters Here</div>
      </div>
      {renderContacts()}
    </div>
  );
};

export default ContactsListPage;
