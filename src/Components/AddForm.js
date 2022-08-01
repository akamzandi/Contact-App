import { useState } from "react";

const AddForm = ({ newContact, submitHandler, inputChangeHandler }) => {
  return (
    <div className="form-container">
      <h3>Add New Contact</h3>
      <form onSubmit={(e) => submitHandler(e)}>
        <section className="input-section">
          <p>Name</p>
          <input
            type="text"
            placeholder="Enter a name"
            name="name"
            value={newContact.name}
            onChange={(e) => inputChangeHandler(e)}
          />
        </section>
        <section className="input-section">
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter an email"
            name="email"
            value={newContact.email}
            onChange={(e) => inputChangeHandler(e)}
          />
        </section>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddForm;
