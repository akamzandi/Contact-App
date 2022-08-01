const Contact = ({ name, email, id, deletContactHandler }) => {
  return (
    <div className="contact-element">
      <div className="contact-container">
        <div className="contact-icon" />
        <div>
          <p className="contact-name">{name}</p>
          <p className="contact-email">{email}</p>
        </div>
      </div>
      <button className="remove-button" onClick={() => deletContactHandler(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
