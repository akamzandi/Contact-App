import Contact from "../Components/Contact";

const ContactsListPage = ({
  contacts,
  allTags,
  deletContactHandler,
  editContactHandler,
}) => {
  const renderContacts = () => {
    if (contacts) {
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

export default ContactsListPage;
