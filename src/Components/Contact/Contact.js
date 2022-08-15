import "./contact.css";

const Contact = ({
  name,
  email,
  id,
  contacTtags,
  allTags,
  deletContactHandler,
  editContactHandler,
}) => {
  const renderValidTagStyle = (inputColor) => {
    return {
      // width: "0.8rem",
      // height: "0.8rem",
      // borderRadius: "0.2rem",
      // marginRight: "0.2rem",
      backgroundColor: inputColor,
    };
  };

  const renderUnvalidTagStyle = () => {
    return {
      padding: "5px 10px",
      margin: "5px",
      color: "gray",
      textDecoration: "line-through",
    };
  };

  const decideStyle = (tag) => {
    const targetTag = allTags.filter((t) => t.label === tag)[0];
    if (targetTag) {
      return renderValidTagStyle(targetTag["color"]);
    } else {
      return renderUnvalidTagStyle();
    }
  };

  const renderContactTags = () => {
    if (allTags) {
      return (
        <>
          {contacTtags.map((tag) => (
            <div className="tag-wrapper" style={decideStyle(tag)}>
              <p key={tag}>{tag}</p>
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <div className="contact-element">
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-icon" />
          <div>
            <p className="contact-name">{name}</p>
            <p className="contact-email">{email}</p>
          </div>
        </div>
        <div className="contact-tags">{renderContactTags()}</div>
      </div>
      <div className="contact-buttons">
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
