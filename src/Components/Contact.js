const Contact = ({
  name,
  email,
  id,
  deletContactHandler,
  editContactHandler,
}) => {
  return (
    <div className="contact-element">
      <div className="contact-container">
        <div className="contact-icon" />
        <div>
          <p className="contact-name">{name}</p>
          <p className="contact-email">{email}</p>
        </div>
      </div>
      <div>
        <button className="edit-button" onClick={() => editContactHandler(id)}>
          Edit
        </button>
        <button
          className="remove-button"
          onClick={() => deletContactHandler(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
