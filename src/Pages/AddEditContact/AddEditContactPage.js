import { useEffect, useRef } from "react";
import "../AddEditContact/addEditContactPage.css";

const AddEditContactPage = ({
  editContactMode,
  allTags,
  forSubmitContact,
  submitHandlerContact,
  inputChangeHandlerContact,
  contactTagsChangeHandler,
  forSubmitContactTagsCheckboxes,
  contacts,
}) => {
  const contactNameInputRef = useRef();

  useEffect(() => {
    contactNameInputRef.current.focus();
  }, [contacts]);

  const getCheckedStatus = (tag) => {
    const correctItem = forSubmitContactTagsCheckboxes.filter(
      (item) => Object.keys(item)[0] === tag.label
    )[0];
    return correctItem[Object.keys(correctItem)[0]];
  };

  const renderTagOptions = () => {
    const tagOptions = allTags.map((tag) => (
      <div className="check-box-element">
        <input
          type="checkbox"
          id={tag.label}
          name={tag.label}
          checked={getCheckedStatus(tag)}
          onChange={contactTagsChangeHandler}
        />
        <label htmlFor={tag.label}>{tag.label}</label>
      </div>
    ));
    return tagOptions;
  };

  return (
    <div className="addEditContact-page">
      <h3>{editContactMode ? "Edit Contact" : "Add New Contact"}</h3>
      <form onSubmit={(e) => submitHandlerContact(e)}>
        <section className="contact-input-section name-section">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            placeholder="Enter a name"
            name="name"
            value={forSubmitContact.name}
            ref={contactNameInputRef}
            onChange={(e) => inputChangeHandlerContact(e)}
          />
        </section>
        <section className="contact-input-section">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            placeholder="Enter an email"
            name="email"
            value={forSubmitContact.email}
            onChange={(e) => inputChangeHandlerContact(e)}
          />
        </section>
        <section className="contact-tags-section">
          <p>Tags</p>
          <div className="checkboxes-container">{renderTagOptions()}</div>
        </section>
        <button type="submit" className="submit-button addEdit-contact-btn">
          {editContactMode ? "Done" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEditContactPage;
