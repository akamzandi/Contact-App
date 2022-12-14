import { BiTrash, BiEditAlt, BiUserCircle } from "react-icons/bi";
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
      backgroundColor: inputColor,
    };
  };

  const renderUnvalidTagStyle = () => {
    return {
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
    <>
      {/* <div className="contact-element">
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
          <button
            className="edit-button"
            onClick={() => editContactHandler(id)}
          >
            Edit
          </button>
          <button
            className="remove-button"
            onClick={() => deletContactHandler(id)}
          >
            Delete
          </button>
        </div>
      </div> */}

      <div className="contact-container">
        <div className="contact-upper-side">
          <div className="contact-info">
            {/* <div className="contact-icon" /> */}
            <div className="contact-icon">
              <BiUserCircle />
            </div>
            <div className="name-mail-container">
              <p className="contact-name">{name}</p>
              <p className="contact-email">{email}</p>
            </div>
          </div>
          <div className="contact-buttons">
            <button
              className="edit-button"
              onClick={() => editContactHandler(id)}
            >
              <BiEditAlt />
            </button>
            <button
              className="remove-button"
              onClick={() => deletContactHandler(id)}
            >
              <BiTrash />
            </button>
          </div>
        </div>
        <div className="contact-lower-side">
          <div className="contact-tags">{renderContactTags()}</div>
        </div>
      </div>
    </>
  );
};

export default Contact;
