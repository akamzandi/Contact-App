const AddEditContactPage = ({
  editMode,
  forSubmitContact,
  submitHandler,
  inputChangeHandler,
}) => {
  return (
    <div className="form-container">
      <h3>{editMode ? "Edit Contact" : "Add New Contact"}</h3>
      <form onSubmit={(e) => submitHandler(e)}>
        <section className="input-section">
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter a name"
            name="name"
            value={forSubmitContact.name}
            onChange={(e) => inputChangeHandler(e)}
          />
        </section>
        <section className="input-section">
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter an email"
            name="email"
            value={forSubmitContact.email}
            onChange={(e) => inputChangeHandler(e)}
          />
        </section>
        <button type="submit" className="add-button">
          {editMode ? "Done" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEditContactPage;
