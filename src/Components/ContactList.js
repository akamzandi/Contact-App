import Contact from "./Contact";

const ContactList = ({ contacts, deletContactHandler }) => {
  const renderContacts = () => {
    if (contacts) {
      return contacts.map((contact) => (
        <Contact
          key={contact.id}
          name={contact.name}
          email={contact.email}
          id={contact.id}
          deletContactHandler={deletContactHandler}
        />
      ));
    } else {
      return (
        <div>
          <p>
            <b>There Is No Contact! </b> --- Try To Add Some.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="contactList-container">
      <h3>Contacts List</h3>
      {renderContacts()}
    </div>
  );
};

export default ContactList;
