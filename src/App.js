import "./App.css";
import Header from "./Components/Header";
import AddForm from "./Components/AddForm";
import ContactList from "./Components/ContactList";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const [contacts, setContacts] = useState([
  //   {
  //     id: 0,
  //     name: "John Doe",
  //     email: "JohnDoe@example.com",
  //   },
  //   {
  //     id: 1,
  //     name: "Some One",
  //     email: "Jayne_Kuhic@sydney.com",
  //   },
  // ]);
  const [contacts, setContacts] = useState(null);

  const [newContact, setNewContact] = useState({
    id: contacts ? contacts.length + 1 : 0,
    name: "",
    email: "",
  });

  const inputChangeHandler = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createOneContact();
    getAllContacts();

    // setContacts(contacts ? [...contacts, newContact] : [newContact]);
  };

  const deletContactHandler = (id) => {
    deleteOneContact(id);
    getAllContacts();

    // const filteredContacts = contacts.filter((item) => item.id != id);
    // setContacts(filteredContacts);
  };

  // to curectly update two related state
  useEffect(() => {
    setNewContact({
      id: contacts ? contacts.length + 1 : 0,
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
      console.log(error);
    }
  };

  const deleteOneContact = async (id) => {
    try {
      const contactDeletionResp = await axios.delete(
        `http://localhost:3001/contacts/${id}`
      );
      // console.log(contactDeletionResp);
    } catch (error) {
      console.log(error);
    }
  };

  const createOneContact = async () => {
    try {
      const createContactResp = await axios.post(
        `http://localhost:3001/contacts/`,
        newContact
      );
      // console.log(createContactResp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="App">
      <Header />
      <AddForm
        submitHandler={submitHandler}
        inputChangeHandler={inputChangeHandler}
        newContact={newContact}
      />
      <ContactList
        contacts={contacts}
        deletContactHandler={deletContactHandler}
      />
    </div>
  );
}

export default App;
