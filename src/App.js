import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import ContactsListPage from "./Pages/ContactsListPage";
import SharedLayout from "./Components/SharedLayout";
import AddEditContactPage from "./Pages/AddEditContactPage";
import { nanoid } from "nanoid";

function App() {
  const [contacts, setContacts] = useState(null);
  const [editedContactId, setEditedContactId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [forSubmitContact, setForSubmitContact] = useState();
  const editModeNavigate = useNavigate();

  const inputChangeHandler = (e) => {
    setForSubmitContact({
      ...forSubmitContact,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editMode) {
      editOneContact(editedContactId, forSubmitContact);
      getAllContacts();
      setEditedContactId(null);
      alert("Contact Edited!");
      editModeNavigate("/");
      setEditMode(false);
    } else {
      createOneContact(forSubmitContact);
      getAllContacts();
      alert("Contact Created!");
    }
  };

  const deletContactHandler = (id) => {
    deleteOneContact(id);
    getAllContacts();
  };

  const editContactHandler = (id) => {
    setEditedContactId(id);
    setEditMode(true);
  };

  useEffect(() => {
    if (editMode) {
      const targetContact = contacts.filter((c) => c.id == editedContactId);
      setForSubmitContact(targetContact[0]);
      editModeNavigate("addEditContact");
    }
  }, [editMode]);

  // to correctly update two related state (forSubmitContact and contacts)
  useEffect(() => {
    setForSubmitContact({
      id: nanoid(),
      name: "",
      email: "",
    });
  }, [contacts]);

  const getAllContacts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/contacts`);
      // console.log(data);
      setContacts(data);
    } catch (error) {
      console.log("get all contacts function - ", error);
    }
  };

  const deleteOneContact = async (id) => {
    try {
      const contactDeletionResp = await axios.delete(
        `http://localhost:3001/contacts/${id}`
      );
      // console.log(contactDeletionResp);
    } catch (error) {
      console.log("delete one contact function - ", error);
    }
  };

  const createOneContact = async (contact) => {
    try {
      const createContactResp = await axios.post(
        `http://localhost:3001/contacts/`,
        contact
      );
      // console.log(createContactResp);
    } catch (error) {
      console.log("create one contact function - ", error);
    }
  };

  const editOneContact = async (id, contact) => {
    try {
      await axios.put(`http://localhost:3001/contacts/${id}`, contact);
    } catch (error) {
      console.log("edit one contact function - ", error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SharedLayout editMode={editMode} />}>
          <Route
            index
            element={
              <ContactsListPage
                contacts={contacts}
                deletContactHandler={deletContactHandler}
                editContactHandler={editContactHandler}
              />
            }
          />
          <Route
            path="addEditContact"
            element={
              <AddEditContactPage
                submitHandler={submitHandler}
                inputChangeHandler={inputChangeHandler}
                forSubmitContact={forSubmitContact}
                editMode={editMode}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
