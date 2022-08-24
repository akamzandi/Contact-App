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
      <h3>Contacts List</h3>
      {renderContacts()}
    </div>
  );
};

export default ContactsListPage;
